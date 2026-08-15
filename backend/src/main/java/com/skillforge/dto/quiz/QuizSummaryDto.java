package com.skillforge.dto.quiz;

import com.skillforge.entity.QuizDifficulty;

import java.time.LocalDateTime;
import java.util.UUID;

public record QuizSummaryDto(
        UUID id,
        String title,
        String topic,
        QuizDifficulty difficulty,
        Integer questionCount,
        LocalDateTime createdAt,
        UUID attemptId
) {
}