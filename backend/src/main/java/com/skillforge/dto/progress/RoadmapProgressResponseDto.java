package com.skillforge.dto.progress;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record RoadmapProgressResponseDto(

        UUID roadmapId,

        int totalSteps,

        int completedSteps,

        BigDecimal progressPercentage,

        UUID nextStepId,

        Integer nextStepOrder,

        LocalDateTime lastCompletedAt,

        List<RoadmapStepProgressDto> steps
) {
}
