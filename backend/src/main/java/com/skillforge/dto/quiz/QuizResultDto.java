package com.skillforge.dto.quiz;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record QuizResultDto(
        UUID attemptId,
        UUID quizId,
        Integer score,
        Integer totalQuestions,
        Double percentage,
        LocalDateTime completedAt,
        List<QuizAttemptAnswerDto> answers
) {
}
