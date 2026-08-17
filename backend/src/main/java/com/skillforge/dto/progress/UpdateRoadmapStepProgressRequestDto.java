package com.skillforge.dto.progress;

import jakarta.validation.constraints.NotNull;

public record UpdateRoadmapStepProgressRequestDto(

        @NotNull(message = "Completed status is required.")
        Boolean completed
) {
}
