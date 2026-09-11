package com.skillforge.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.dto.resume.ResumeAnalysisDto;
import com.skillforge.dto.resume.ResumeReviewResponseDto;
import com.skillforge.dto.resume.ResumeReviewSummaryDto;
import com.skillforge.entity.ResumeReview;
import com.skillforge.entity.User;
import com.skillforge.exception.ResumeProcessingException;
import com.skillforge.mapper.ResumeReviewMapper;
import com.skillforge.repository.ResumeReviewRepository;
import com.skillforge.service.AiProvider;
import com.skillforge.service.ResumeReviewService;
import com.skillforge.service.ResumeStorageResult;
import com.skillforge.service.ResumeStorageService;
import com.skillforge.service.ResumeTextExtractionService;
import com.skillforge.service.UserService;
import com.skillforge.util.ResumeAnalysisParser;
import com.skillforge.validation.ResumeFileValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ResumeReviewServiceImpl
        implements ResumeReviewService {

    private static final int MAX_EXTRACTED_CHARACTERS = 30_000;

    private final ResumeReviewRepository resumeReviewRepository;

    private final ResumeReviewMapper resumeReviewMapper;

    private final ResumeTextExtractionService resumeTextExtractionService;

    private final ResumeStorageService resumeStorageService;

    private final ResumeFileValidator resumeFileValidator;

    private final UserService userService;

    private final AiProvider aiProvider;

    private final ResumeAnalysisParser resumeAnalysisParser;

    private final ObjectMapper objectMapper;

    @Override
    public ResumeReviewResponseDto reviewResume(
            MultipartFile file
    ) {

        /*
         * Step 1:
         * Validate uploaded resume before doing any processing.
         */
        resumeFileValidator.validate(file);

        /*
         * Step 2:
         * Get authenticated user.
         */
        User currentUser =
                userService.getCurrentUserEntity();

        /*
         * Step 3:
         * Extract readable text from the resume.
         */
        String extractedText =
                resumeTextExtractionService.extractText(file);

        if (extractedText == null
                || extractedText.isBlank()) {

            throw new ResumeProcessingException(
                    "Unable to extract readable text from resume."
            );
        }

        /*
         * Step 4:
         * Sanitize extracted text.
         */
        String cleanedText =
                sanitizeResumeText(extractedText);

        /*
         * Prevent excessively large prompts.
         */
        if (cleanedText.length()
                > MAX_EXTRACTED_CHARACTERS) {

            log.warn(
                    "Resume text exceeded maximum allowed characters. " +
                    "userId={}, originalLength={}",
                    currentUser.getId(),
                    cleanedText.length()
            );

            cleanedText =
                    cleanedText.substring(
                            0,
                            MAX_EXTRACTED_CHARACTERS
                    );
        }

        /*
         * Step 5:
         * Store original resume in Cloudinary.
         *
         * Storage is done before AI processing so that the
         * successfully reviewed resume has its associated
         * cloud storage record.
         */
        ResumeStorageResult upload =
                resumeStorageService.store(
                        file,
                        currentUser
                );

        try {

            /*
             * Step 6:
             * Build AI prompt.
             */
            String prompt =
                    buildResumeReviewPrompt(
                            cleanedText
                    );

            /*
             * Step 7:
             * Send request through provider abstraction.
             *
             * Controller/business logic does not directly
             * communicate with Gemini.
             */
            String aiResponse = aiProvider.generateJsonResponse(prompt);

            /*
             * Step 8:
             * Parse and validate structured AI response.
             */
            ResumeAnalysisDto analysis =
                    resumeAnalysisParser.parse(
                            aiResponse
                    );

            /*
             * Step 9:
             * Build database entity.
             *
             * List fields are stored as JSON strings because
             * ResumeReview currently uses PostgreSQL TEXT columns.
             */
            ResumeReview review =
                    ResumeReview.builder()
                            .user(currentUser)

                            .fileName(
                                    sanitizeFileName(
                                            file.getOriginalFilename()
                                    )
                            )

                            .fileType(
                                    detectFileType(file)
                            )

                            .fileSize(
                                    file.getSize()
                            )

                            .cloudinaryPublicId(
                                    upload.publicId()
                            )

                            .atsScore(
                                    normalizeScore(
                                            analysis.atsScore()
                                    )
                            )

                            .summary(
                                    analysis.summary()
                            )

                            .strengths(
                                    listToJson(
                                            analysis.strengths()
                                    )
                            )

                            .weaknesses(
                                    listToJson(
                                            analysis.weaknesses()
                                    )
                            )

                            .skillsAnalysis(
                                    analysis.skillsAnalysis()
                            )

                            .experienceAnalysis(
                                    analysis.experienceAnalysis()
                            )

                            .educationAnalysis(
                                    analysis.educationAnalysis()
                            )

                            .missingKeywords(
                                    listToJson(
                                            analysis.missingKeywords()
                                    )
                            )

                            .recommendedKeywords(
                                    listToJson(
                                            analysis.recommendedKeywords()
                                    )
                            )

                            .formattingSuggestions(
                                    listToJson(
                                            analysis.formattingSuggestions()
                                    )
                            )

                            .actionPlan(
                                    listToJson(
                                            analysis.actionPlan()
                                    )
                            )

                            .build();

            /*
             * Step 10:
             * Persist review.
             */
            ResumeReview saved =
                    resumeReviewRepository.save(
                            review
                    );

            log.info(
                    "Resume review created successfully. reviewId={}, userId={}",
                    saved.getId(),
                    currentUser.getId()
            );

            /*
             * Step 11:
             * Convert entity to API response DTO.
             */
            return resumeReviewMapper.toResponseDto(
                    saved
            );

        } catch (ResumeProcessingException exception) {

            /*
             * AI parsing/processing failed.
             * Remove already-uploaded Cloudinary file.
             */
            cleanupStoredResume(
                    upload.publicId()
            );

            throw exception;

        } catch (Exception exception) {

            /*
             * Any unexpected failure should also clean up
             * the uploaded Cloudinary file.
             */
            cleanupStoredResume(
                    upload.publicId()
            );

            log.error(
                    "Resume review processing failed. userId={}",
                    currentUser.getId(),
                    exception
            );

            throw new ResumeProcessingException(
                    "Unable to complete resume review.",
                    exception
            );
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ResumeReviewSummaryDto> getReviewHistory(
            Pageable pageable
    ) {

        User currentUser =
                userService.getCurrentUserEntity();

        return resumeReviewRepository
                .findByUserOrderByCreatedAtDesc(
                        currentUser,
                        pageable
                )
                .map(
                        resumeReviewMapper::toSummaryDto
                );
    }

    @Override
    @Transactional(readOnly = true)
    public ResumeReviewResponseDto getReview(
            UUID reviewId
    ) {

        User currentUser =
                userService.getCurrentUserEntity();

        ResumeReview review =
                resumeReviewRepository
                        .findByIdAndUser(
                                reviewId,
                                currentUser
                        )
                        .orElseThrow(
                                () ->
                                        new ResumeProcessingException(
                                                "Resume review not found."
                                        )
                        );

        return resumeReviewMapper.toResponseDto(
                review
        );
    }

    @Override
    public void deleteReview(
            UUID reviewId
    ) {

        User currentUser =
                userService.getCurrentUserEntity();

        ResumeReview review =
                resumeReviewRepository
                        .findByIdAndUser(
                                reviewId,
                                currentUser
                        )
                        .orElseThrow(
                                () ->
                                        new ResumeProcessingException(
                                                "Resume review not found."
                                        )
                        );

        String publicId =
                review.getCloudinaryPublicId();

        /*
         * Delete database record first.
         */
        resumeReviewRepository.delete(
                review
        );

        /*
         * Then clean up Cloudinary.
         *
         * Database deletion should not be blocked just because
         * external storage cleanup failed.
         */
        if (publicId != null
                && !publicId.isBlank()) {

            try {

                resumeStorageService.delete(
                        publicId
                );

            } catch (Exception exception) {

                log.warn(
                        "Resume deleted from database but " +
                        "Cloudinary cleanup failed. reviewId={}",
                        reviewId,
                        exception
                );
            }
        }

        log.info(
                "Resume review deleted successfully. reviewId={}, userId={}",
                reviewId,
                currentUser.getId()
        );
    }

    /**
     * Builds the structured prompt sent to the AI provider.
     */
    private String buildResumeReviewPrompt(
            String resumeText
    ) {

        return """
                You are an expert ATS resume reviewer and career coach.

                Analyze the following resume professionally.

                Return ONLY valid JSON.
                Do not use markdown.
                Do not wrap the JSON in triple backticks.

                Required JSON structure:

                {
                  "atsScore": 0,
                  "summary": "",
                  "strengths": [],
                  "weaknesses": [],
                  "skillsAnalysis": "",
                  "experienceAnalysis": "",
                  "educationAnalysis": "",
                  "missingKeywords": [],
                  "recommendedKeywords": [],
                  "formattingSuggestions": [],
                  "actionPlan": []
                }

                ATS score must be an integer from 0 to 100.

                Evaluate:

                - ATS compatibility
                - resume clarity
                - skills relevance
                - experience quality
                - measurable achievements
                - education section
                - keywords
                - formatting
                - career readiness

                Do not invent experience, skills, education,
                companies, projects or achievements.

                Base the analysis only on information present
                in the provided resume.

                Keep recommendations practical and specific.

                Resume:

                %s
                """.formatted(
                resumeText
        );
    }

    /**
     * Converts a list into JSON before storing it in PostgreSQL TEXT.
     */
    private String listToJson(
            List<String> values
    ) {

        try {

            return objectMapper.writeValueAsString(
                    safeList(values)
            );

        } catch (JsonProcessingException exception) {

            throw new ResumeProcessingException(
                    "Unable to store resume analysis data.",
                    exception
            );
        }
    }

    /**
     * Ensures null lists never reach the database.
     */
    private List<String> safeList(
            List<String> values
    ) {

        return values == null
                ? List.of()
                : List.copyOf(values);
    }

    /**
     * Removes invalid/control characters and excessive whitespace
     * from extracted resume text.
     */
    private String sanitizeResumeText(
            String text
    ) {

        return text
                .replace("\u0000", "")
                .replaceAll("\\s{3,}", " ")
                .trim();
    }

    /**
     * Sanitizes the original uploaded filename before persistence.
     */
    private String sanitizeFileName(
            String fileName
    ) {

        if (fileName == null
                || fileName.isBlank()) {

            return "resume";
        }

        return fileName
                .replaceAll(
                        "[\\\\/:*?\"<>|]",
                        "_"
                )
                .trim();
    }

    /**
     * Detects uploaded file MIME type.
     */
    private String detectFileType(
            MultipartFile file
    ) {

        String contentType =
                file.getContentType();

        return contentType == null
                ? "application/octet-stream"
                : contentType;
    }

    /**
     * Keeps ATS score inside the supported 0-100 range.
     */
    private Integer normalizeScore(
            Integer score
    ) {

        if (score == null) {
            return 0;
        }

        return Math.max(
                0,
                Math.min(
                        100,
                        score
                )
        );
    }

    /**
     * Removes the Cloudinary file if resume processing fails
     * after successful upload.
     */
    private void cleanupStoredResume(
            String publicId
    ) {

        if (publicId == null
                || publicId.isBlank()) {

            return;
        }

        try {

            resumeStorageService.delete(
                    publicId
            );

        } catch (Exception cleanupException) {

            log.warn(
                    "Failed to cleanup Cloudinary resume file. publicId={}",
                    publicId,
                    cleanupException
            );
        }
    }
}