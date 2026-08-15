package com.skillforge.dto.resume;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ResumeReviewResponseDto(

        UUID id,

        String fileName,

        String fileType,

        long fileSize,

        Integer atsScore,

        String summary,

        List<String> strengths,

        List<String> weaknesses,

        String skillsAnalysis,

        String experienceAnalysis,

        String educationAnalysis,

        List<String> missingKeywords,

        List<String> recommendedKeywords,

        List<String> formattingSuggestions,

        List<String> actionPlan,

        LocalDateTime createdAt
) {
}