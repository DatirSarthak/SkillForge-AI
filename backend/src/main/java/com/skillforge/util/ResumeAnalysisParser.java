package com.skillforge.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.dto.resume.ResumeAnalysisDto;
import com.skillforge.exception.ResumeProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ResumeAnalysisParser {

    private final ObjectMapper objectMapper;

    public ResumeAnalysisDto parse(String aiResponse) {

        if (aiResponse == null || aiResponse.isBlank()) {
            throw new ResumeProcessingException(
                    "AI returned an empty resume analysis."
            );
        }

        try {

            String json = cleanJson(aiResponse);

            JsonNode node = objectMapper.readTree(json);

            if (!node.isObject()) {
                throw new ResumeProcessingException(
                        "AI returned an invalid resume analysis."
                );
            }

            ResumeAnalysisDto analysis =
                    objectMapper.treeToValue(
                            node,
                            ResumeAnalysisDto.class
                    );

            validate(analysis);

            return analysis;

        } catch (JsonProcessingException exception) {

            throw new ResumeProcessingException(
                    "Unable to parse AI resume analysis.",
                    exception
            );
        }
    }

    private String cleanJson(String response) {

        String cleaned = response.trim();

        if (cleaned.startsWith("```")) {

            int firstNewLine = cleaned.indexOf('\n');
            int lastFence = cleaned.lastIndexOf("```");

            if (firstNewLine > 0
                    && lastFence > firstNewLine) {

                cleaned = cleaned.substring(
                        firstNewLine + 1,
                        lastFence
                );
            }
        }

        return cleaned.trim();
    }

    private void validate(ResumeAnalysisDto analysis) {

        if (analysis == null
                || analysis.atsScore() == null) {

            throw new ResumeProcessingException(
                    "AI returned an incomplete resume analysis."
            );
        }

        if (analysis.atsScore() < 0
                || analysis.atsScore() > 100) {

            throw new ResumeProcessingException(
                    "AI returned an invalid ATS score."
            );
        }
    }
}
