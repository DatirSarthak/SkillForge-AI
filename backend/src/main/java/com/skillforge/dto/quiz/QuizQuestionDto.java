package com.skillforge.dto.quiz;

import java.util.List;
import java.util.UUID;

public record QuizQuestionDto(

        UUID id,

        String questionText,

        List<QuizOptionDto> options,

        String correctOption,

        String explanation,

        Integer questionOrder

) {
}
