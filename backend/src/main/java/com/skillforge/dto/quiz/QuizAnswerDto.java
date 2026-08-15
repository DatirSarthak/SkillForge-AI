package com.skillforge.dto.quiz;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record QuizAnswerDto(

        @NotNull(message = "Question ID is required")
        UUID questionId,

        @NotBlank(message = "Selected option is required")
        @Pattern(
                regexp = "^[ABCD]$",
                message = "Selected option must be A, B, C or D"
        )
        String selectedOption

) {
}
