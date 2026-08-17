package com.skillforge.dto.roadmap.ai;

import java.util.List;

public record AiRoadmapStepDto(

        String title,

        String description,

        String difficulty,

        List<String> learningObjectives,

        List<String> subtopics,

        String projectSuggestion,

        String estimatedDuration
) {
}
