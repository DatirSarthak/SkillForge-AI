package com.skillforge.dto.progress;

import java.time.LocalDateTime;
import java.util.UUID;

public record RoadmapStepProgressDto(

        UUID stepId,

        Integer stepOrder,

        Boolean completed,

        LocalDateTime completedAt
) {
}
