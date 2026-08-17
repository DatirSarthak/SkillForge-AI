package com.skillforge.dto.roadmap;

import java.util.List;
import java.util.UUID;

public record RoadmapStepDto(

        UUID id,

        String title,

        String description,

        String difficulty,

        List<String> learningObjectives,

        List<String> subtopics,

        String projectSuggestion,

        String estimatedDuration,

        Integer stepOrder
) {
}