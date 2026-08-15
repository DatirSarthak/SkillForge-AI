package com.skillforge.dto.quiz.ai;

import java.util.List;

public record AiQuizResponseDto(

        String title,

        String topic,

        String difficulty,

        List<AiQuizQuestionDto> questions

) {
}
