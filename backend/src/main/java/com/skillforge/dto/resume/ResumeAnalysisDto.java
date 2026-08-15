package com.skillforge.dto.resume;

import java.util.List;

public record ResumeAnalysisDto(

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

        List<String> actionPlan
) {
}
