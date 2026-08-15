package com.skillforge.dto.quiz;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record QuizAttemptRequestDto(

        @NotEmpty(message = "At least one answer is required")
        List<@Valid QuizAnswerDto> answers

) {
}
