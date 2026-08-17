package com.skillforge.dto.roadmap;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RoadmapGenerateRequestDto(

        @NotBlank(message = "Goal is required.")
        @Size(max = 500, message = "Goal must not exceed 500 characters.")
        String goal,

        @NotBlank(message = "Current skills are required.")
        @Size(max = 2000, message = "Current skills must not exceed 2000 characters.")
        String currentSkills,

        @NotBlank(message = "Experience level is required.")
        @Size(max = 50, message = "Experience level must not exceed 50 characters.")
        String experienceLevel,

        @NotBlank(message = "Topic is required.")
        @Size(max = 150, message = "Topic must not exceed 150 characters.")
        String topic,

        @Size(max = 150, message = "Target role must not exceed 150 characters.")
        String targetRole
) {
}