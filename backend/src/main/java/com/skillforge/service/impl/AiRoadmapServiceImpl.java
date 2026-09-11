package com.skillforge.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.dto.roadmap.RoadmapGenerateRequestDto;
import com.skillforge.dto.roadmap.RoadmapResponseDto;
import com.skillforge.dto.roadmap.RoadmapSummaryDto;
import com.skillforge.dto.roadmap.ai.AiRoadmapResponseDto;
import com.skillforge.dto.roadmap.ai.AiRoadmapStepDto;
import com.skillforge.entity.Roadmap;
import com.skillforge.entity.RoadmapStep;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.mapper.RoadmapMapper;
import com.skillforge.repository.RoadmapRepository;
import com.skillforge.service.AiProvider;
import com.skillforge.service.AiRoadmapService;
import com.skillforge.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AiRoadmapServiceImpl implements AiRoadmapService {

    private static final int MIN_STEPS = 3;
    private static final int MAX_STEPS = 20;

    private final AiProvider aiProvider;
    private final UserService userService;
    private final RoadmapRepository roadmapRepository;
    private final RoadmapMapper roadmapMapper;
    private final ObjectMapper objectMapper;

    @Override
    public RoadmapResponseDto generateRoadmap(
            RoadmapGenerateRequestDto request
    ) {

        User currentUser = userService.getCurrentUserEntity();

        String prompt = buildRoadmapPrompt(request);

        log.info(
                "Generating AI roadmap. userId={}, topic={}, targetRole={}",
                currentUser.getId(),
                request.topic(),
                request.targetRole()
        );

        String aiResponse = aiProvider.generateJsonResponse(prompt);

        AiRoadmapResponseDto generatedRoadmap =
                parseAiResponse(aiResponse);

        validateGeneratedRoadmap(generatedRoadmap);

        Roadmap roadmap = buildRoadmapEntity(
                generatedRoadmap,
                request,
                currentUser
        );

        Roadmap savedRoadmap = roadmapRepository.save(roadmap);

        log.info(
                "AI roadmap generated successfully. roadmapId={}, userId={}",
                savedRoadmap.getId(),
                currentUser.getId()
        );

        return roadmapMapper.toResponseDto(savedRoadmap);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoadmapSummaryDto> getUserRoadmaps() {

        User currentUser = userService.getCurrentUserEntity();

        return roadmapRepository
                .findByUserOrderByCreatedAtDesc(currentUser)
                .stream()
                .map(roadmapMapper::toSummaryDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public RoadmapResponseDto getRoadmap(
            java.util.UUID roadmapId
    ) {

        User currentUser = userService.getCurrentUserEntity();

        Roadmap roadmap = roadmapRepository
                .findByIdAndUser(roadmapId, currentUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Roadmap not found."
                        )
                );

        return roadmapMapper.toResponseDto(roadmap);
    }

    @Override
    public void deleteRoadmap(
            java.util.UUID roadmapId
    ) {

        User currentUser = userService.getCurrentUserEntity();

        Roadmap roadmap = roadmapRepository
                .findByIdAndUser(roadmapId, currentUser)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Roadmap not found."
                        )
                );

        roadmapRepository.delete(roadmap);

        log.info(
                "Roadmap deleted successfully. roadmapId={}, userId={}",
                roadmapId,
                currentUser.getId()
        );
    }

    private String buildRoadmapPrompt(
            RoadmapGenerateRequestDto request
    ) {

        String targetRole =
                request.targetRole() == null ||
                request.targetRole().isBlank()
                        ? "Not specified"
                        : request.targetRole();

        return """
                You are an expert learning and career roadmap architect.

                Create a personalized learning roadmap based strictly on the
                user's information below.

                USER INFORMATION

                Goal:
                %s

                Current Skills:
                %s

                Experience Level:
                %s

                Topic:
                %s

                Target Role:
                %s

                REQUIREMENTS

                1. Create a logical progression from the user's current level
                   toward the stated goal.
                2. Do not unnecessarily repeat skills the user already knows.
                3. Start with prerequisites only when they are genuinely needed.
                4. Progress from fundamentals to advanced concepts.
                5. Include practical projects where appropriate.
                6. Include realistic learning objectives.
                7. Include useful subtopics.
                8. Keep the roadmap focused on the requested topic and goal.
                9. Make the roadmap useful for career preparation when a target
                   role is provided.
                10. Generate between 3 and 20 roadmap steps.
                11. Return ONLY valid JSON.
                12. Do not use Markdown.
                13. Do not wrap the JSON in ```json fences.

                REQUIRED JSON STRUCTURE

                {
                  "title": "string",
                  "goal": "string",
                  "summary": "string",
                  "steps": [
                    {
                      "title": "string",
                      "description": "string",
                      "difficulty": "BEGINNER | INTERMEDIATE | ADVANCED",
                      "learningObjectives": [
                        "string"
                      ],
                      "subtopics": [
                        "string"
                      ],
                      "projectSuggestion": "string",
                      "estimatedDuration": "string"
                    }
                  ]
                }
                """.formatted(
                request.goal(),
                request.currentSkills(),
                request.experienceLevel(),
                request.topic(),
                targetRole
        );
    }

    private AiRoadmapResponseDto parseAiResponse(
            String response
    ) {

        if (response == null || response.isBlank()) {
            throw new IllegalStateException(
                    "AI returned an empty roadmap response."
            );
        }

        String cleanedResponse = cleanJsonResponse(response);

        try {

            return objectMapper.readValue(
                    cleanedResponse,
                    AiRoadmapResponseDto.class
            );

        } catch (JsonProcessingException ex) {

            log.error(
                    "Failed to parse AI roadmap response. response={}",
                    cleanedResponse,
                    ex
            );

            throw new IllegalStateException(
                    "AI returned an invalid roadmap response."
            );
        }
    }

    private String cleanJsonResponse(
            String response
    ) {

        String cleaned = response.trim();

        if (cleaned.startsWith("```json")) {
            cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith("```")) {
            cleaned = cleaned.substring(3);
        }

        if (cleaned.endsWith("```")) {
            cleaned = cleaned.substring(
                    0,
                    cleaned.length() - 3
            );
        }

        return cleaned.trim();
    }

    private void validateGeneratedRoadmap(
            AiRoadmapResponseDto roadmap
    ) {

        if (roadmap == null) {
            throw new IllegalStateException(
                    "AI returned an empty roadmap."
            );
        }

        if (isBlank(roadmap.title())) {
            throw new IllegalStateException(
                    "AI roadmap title is missing."
            );
        }

        if (isBlank(roadmap.goal())) {
            throw new IllegalStateException(
                    "AI roadmap goal is missing."
            );
        }

        if (roadmap.steps() == null ||
                roadmap.steps().size() < MIN_STEPS ||
                roadmap.steps().size() > MAX_STEPS) {

            throw new IllegalStateException(
                    "AI generated an invalid number of roadmap steps."
            );
        }

        for (AiRoadmapStepDto step : roadmap.steps()) {

            if (step == null) {
                throw new IllegalStateException(
                        "AI generated an invalid roadmap step."
                );
            }

            if (isBlank(step.title())) {
                throw new IllegalStateException(
                        "Roadmap step title is missing."
                );
            }

            if (isBlank(step.description())) {
                throw new IllegalStateException(
                        "Roadmap step description is missing."
                );
            }

            if (isBlank(step.difficulty())) {
                throw new IllegalStateException(
                        "Roadmap step difficulty is missing."
                );
            }

            if (!List.of(
                    "BEGINNER",
                    "INTERMEDIATE",
                    "ADVANCED"
            ).contains(
                    step.difficulty().trim().toUpperCase()
            )) {

                throw new IllegalStateException(
                        "AI generated an invalid roadmap difficulty."
                );
            }

            if (step.learningObjectives() == null ||
                    step.learningObjectives().isEmpty()) {

                throw new IllegalStateException(
                        "Roadmap step learning objectives are missing."
                );
            }

            if (step.subtopics() == null ||
                    step.subtopics().isEmpty()) {

                throw new IllegalStateException(
                        "Roadmap step subtopics are missing."
                );
            }
        }
    }

    private Roadmap buildRoadmapEntity(
            AiRoadmapResponseDto generatedRoadmap,
            RoadmapGenerateRequestDto request,
            User user
    ) {

        Roadmap roadmap = Roadmap.builder()
                .user(user)
                .title(generatedRoadmap.title().trim())
                .goal(request.goal().trim())
                .topic(request.topic().trim())
                .experienceLevel(request.experienceLevel().trim())
                .targetRole(
                        request.targetRole() == null ||
                        request.targetRole().isBlank()
                                ? null
                                : request.targetRole().trim()
                )
                .summary(
                        generatedRoadmap.summary() == null
                                ? null
                                : generatedRoadmap.summary().trim()
                )
                .build();

        int stepOrder = 1;

        for (AiRoadmapStepDto aiStep :
                generatedRoadmap.steps()) {

            RoadmapStep step = RoadmapStep.builder()
                    .title(aiStep.title().trim())
                    .description(aiStep.description().trim())
                    .difficulty(
                            aiStep.difficulty()
                                    .trim()
                                    .toUpperCase()
                    )
                    .stepOrder(stepOrder++)
                    .projectSuggestion(
                            aiStep.projectSuggestion() == null
                                    ? null
                                    : aiStep.projectSuggestion().trim()
                    )
                    .estimatedDuration(
                            aiStep.estimatedDuration() == null
                                    ? null
                                    : aiStep.estimatedDuration().trim()
                    )
                    .learningObjectives(
                            aiStep.learningObjectives() == null
                                    ? Collections.emptyList()
                                    : aiStep.learningObjectives()
            )
                    .subtopics(
                            aiStep.subtopics() == null
                                    ? Collections.emptyList()
                                    : aiStep.subtopics()
                    )
                    .build();

            roadmap.addStep(step);
        }

        return roadmap;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}