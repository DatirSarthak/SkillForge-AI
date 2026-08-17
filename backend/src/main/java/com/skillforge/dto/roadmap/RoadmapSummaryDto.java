package com.skillforge.dto.roadmap;

import java.time.LocalDateTime;
import java.util.UUID;

public record RoadmapSummaryDto(

        UUID id,

        String title,

        String goal,

        String topic,

        String experienceLevel,

        String targetRole,

        Integer stepCount,

        LocalDateTime createdAt
) {
}
