package com.skillforge.util;

public final class ResumeAnalysisPromptBuilder {

    private ResumeAnalysisPromptBuilder() {
    }

    public static String build(String resumeText) {

        return """
                You are an expert ATS resume reviewer and career coach.

                Analyze the resume below.

                Return ONLY valid JSON.
                Do not use Markdown.
                Do not wrap the JSON in code fences.

                The JSON must follow this exact structure:

                {
                  "atsScore": 0,
                  "summary": "",
                  "strengths": [],
                  "weaknesses": [],
                  "skills": {
                    "detected": [],
                    "recommended": []
                  },
                  "experience": {
                    "assessment": "",
                    "suggestions": []
                  },
                  "education": {
                    "assessment": ""
                  },
                  "keywords": {
                    "missing": [],
                    "recommended": []
                  },
                  "formattingSuggestions": [],
                  "actionableImprovements": [],
                  "careerRecommendations": []
                }

                Rules:
                - atsScore must be an integer from 0 to 100.
                - Do not invent experience, education or skills.
                - Recommendations must be based on the resume.
                - Keep suggestions practical and actionable.
                - Focus on ATS compatibility.
                - Identify measurable-impact opportunities.
                - Evaluate skills relevance.
                - Evaluate experience bullet quality.
                - Evaluate keyword coverage.
                - If a section is unavailable, say so instead of inventing data.

                Resume:

                ---
                %s
                ---
                """.formatted(resumeText);
    }
}
