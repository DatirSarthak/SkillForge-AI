package com.skillforge.service.impl;

import com.skillforge.dto.search.SearchResponseDto;
import com.skillforge.dto.search.SearchResultDto;
import com.skillforge.entity.Note;
import com.skillforge.entity.Quiz;
import com.skillforge.entity.ResumeReview;
import com.skillforge.entity.Roadmap;
import com.skillforge.entity.User;
import com.skillforge.repository.NoteRepository;
import com.skillforge.repository.QuizRepository;
import com.skillforge.repository.ResumeReviewRepository;
import com.skillforge.repository.RoadmapRepository;
import com.skillforge.service.SearchService;
import com.skillforge.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchServiceImpl implements SearchService {

    private static final int DEFAULT_LIMIT = 20;
    private static final int MAX_LIMIT = 50;

    private final NoteRepository noteRepository;
    private final QuizRepository quizRepository;
    private final RoadmapRepository roadmapRepository;
    private final ResumeReviewRepository resumeReviewRepository;
    private final UserService userService;

    @Override
    public SearchResponseDto search(String query, int limit) {

        String normalizedQuery = query == null
                ? ""
                : query.trim();

        if (normalizedQuery.isBlank()) {
            return new SearchResponseDto(
                    normalizedQuery,
                    List.of(),
                    0,
                    normalizeLimit(limit),
                    false
            );
        }

        int normalizedLimit = normalizeLimit(limit);
        User currentUser = userService.getCurrentUserEntity();

        Pageable pageable = PageRequest.of(0, normalizedLimit);

        Page<Note> notes = noteRepository.searchByUser(
                currentUser,
                normalizedQuery,
                pageable
        );

        Page<Quiz> quizzes = quizRepository.searchByUser(
                currentUser,
                normalizedQuery,
                pageable
        );

        Page<Roadmap> roadmaps = roadmapRepository.searchByUser(
                currentUser,
                normalizedQuery,
                pageable
        );

        Page<ResumeReview> resumeReviews =
                resumeReviewRepository.searchByUser(
                        currentUser,
                        normalizedQuery,
                        pageable
                );

        List<SearchResultDto> results = new ArrayList<>();

        notes.getContent()
                .stream()
                .map(this::toNoteResult)
                .forEach(results::add);

        quizzes.getContent()
                .stream()
                .map(this::toQuizResult)
                .forEach(results::add);

        roadmaps.getContent()
                .stream()
                .map(this::toRoadmapResult)
                .forEach(results::add);

        resumeReviews.getContent()
                .stream()
                .map(this::toResumeReviewResult)
                .forEach(results::add);

        results.sort(
                Comparator.comparing(
                        SearchResultDto::createdAt,
                        Comparator.nullsLast(
                                Comparator.reverseOrder()
                        )
                )
        );

        boolean hasMore =
                notes.hasNext()
                        || quizzes.hasNext()
                        || roadmaps.hasNext()
                        || resumeReviews.hasNext();

        if (results.size() > normalizedLimit) {
            results = new ArrayList<>(
                    results.subList(0, normalizedLimit)
            );
        }

        long totalResults =
                notes.getTotalElements()
                        + quizzes.getTotalElements()
                        + roadmaps.getTotalElements()
                        + resumeReviews.getTotalElements();

        return new SearchResponseDto(
                normalizedQuery,
                List.copyOf(results),
                totalResults,
                normalizedLimit,
                hasMore
        );
    }

    private SearchResultDto toNoteResult(Note note) {

        return new SearchResultDto(
                note.getId(),
                note.getTitle(),
                "NOTE",
                buildPreview(
                        note.getPrompt(),
                        "AI Note"
                ),
                note.getUpdatedAt(),
                "/ai-notes"
        );
    }

    private SearchResultDto toQuizResult(Quiz quiz) {

        return new SearchResultDto(
                quiz.getId(),
                quiz.getTitle(),
                "QUIZ",
                buildPreview(
                        quiz.getTopic(),
                        quiz.getDifficulty() == null
                                ? "AI Quiz"
                                : "AI Quiz • "
                                + quiz.getDifficulty().name()
                ),
                quiz.getUpdatedAt(),
                "/ai-quiz"
        );
    }

    private SearchResultDto toRoadmapResult(Roadmap roadmap) {

        return new SearchResultDto(
                roadmap.getId(),
                roadmap.getTitle(),
                "ROADMAP",
                buildPreview(
                        roadmap.getGoal(),
                        "AI Roadmap"
                ),
                roadmap.getUpdatedAt(),
                "/ai-roadmap/" + roadmap.getId()
        );
    }

    private SearchResultDto toResumeReviewResult(
            ResumeReview review
    ) {

        return new SearchResultDto(
                review.getId(),
                review.getFileName(),
                "RESUME_REVIEW",
                buildPreview(
                        review.getSummary(),
                        "Resume Review • ATS "
                                + review.getAtsScore()
                ),
                review.getUpdatedAt(),
                "/resume-review/" + review.getId()
        );
    }

    private String buildPreview(
            String value,
            String fallback
    ) {

        if (value == null || value.isBlank()) {
            return fallback;
        }

        String normalized = value
                .replaceAll("\\s+", " ")
                .trim();

        if (normalized.length() <= 140) {
            return normalized;
        }

        return normalized.substring(0, 137) + "...";
    }

    private int normalizeLimit(int limit) {

        if (limit <= 0) {
            return DEFAULT_LIMIT;
        }

        return Math.min(limit, MAX_LIMIT);
    }
}
