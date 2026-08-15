package com.skillforge.dto.quiz;

import java.util.UUID;

public record QuizQuestionResultDto(
        UUID questionId,
        Integer questionNumber,
        String questionText,
        String selectedOption,
        String correctOption,
        Boolean correct,
        String explanation
) {
}