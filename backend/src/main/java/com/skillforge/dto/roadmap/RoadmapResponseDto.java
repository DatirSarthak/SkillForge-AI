package com.skillforge.dto.roadmap;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record RoadmapResponseDto(

        UUID id,

        String title,

        String goal,

        String topic,

        String experienceLevel,

        String targetRole,

        String summary,

        List<RoadmapStepDto> steps,

        LocalDateTime createdAt,

        LocalDateTime updatedAt
) {
}