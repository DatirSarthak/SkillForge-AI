package com.skillforge.dto.roadmap.ai;

import java.util.List;

public record AiRoadmapResponseDto(

        String title,

        String goal,

        String summary,

        List<AiRoadmapStepDto> steps
) {
}