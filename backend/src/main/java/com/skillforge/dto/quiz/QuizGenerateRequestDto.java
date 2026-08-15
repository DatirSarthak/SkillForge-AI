package com.skillforge.dto.quiz;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record QuizGenerateRequestDto(

        @NotBlank(message = "Topic is required")
        @Size(
                min = 2,
                max = 200,
                message = "Topic must be between 2 and 200 characters"
        )
        String topic,

        @NotNull(message = "Difficulty is required")
        String difficulty,

        @NotNull(message = "Question count is required")
        @Min(
                value = 5,
                message = "Minimum 5 questions are required"
        )
        @Max(
                value = 20,
                message = "Maximum 20 questions are allowed"
        )
        Integer questionCount

) {
}
