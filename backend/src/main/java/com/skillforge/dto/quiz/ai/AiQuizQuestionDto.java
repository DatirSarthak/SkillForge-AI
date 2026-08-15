package com.skillforge.dto.quiz.ai;

import java.util.Map;

public record AiQuizQuestionDto(

        String questionText,

        Map<String, String> options,

        String correctOption,

        String explanation

) {
}
