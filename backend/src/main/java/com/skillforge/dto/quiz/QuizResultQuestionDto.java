package com.skillforge.dto.quiz;

import java.util.UUID;

public record QuizResultQuestionDto(
        UUID questionId,
        int questionNumber,
        String questionText,
        String optionA,
        String optionB,
        String optionC,
        String optionD,
        String selectedOption,
        String correctOption,
        boolean correct,
        String explanation
) {
}