package com.skillforge.service.impl;

import com.skillforge.config.GeminiConfig;
import com.skillforge.constants.AiConstants;
import com.skillforge.dto.ai.gemini.GeminiContent;
import com.skillforge.dto.ai.gemini.GeminiPart;
import com.skillforge.dto.ai.gemini.GeminiRequest;
import com.skillforge.exception.AiException;
import com.skillforge.service.AiProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

import com.skillforge.dto.ai.gemini.GeminiResponse;
import org.springframework.http.MediaType;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiProviderImpl implements AiProvider {

    private final RestClient restClient;
    private final GeminiConfig geminiConfig;

    private String buildRequestUrl() {

        return String.format(
                "%s/%s%s?key=%s",
                geminiConfig.getBaseUrl(),
                geminiConfig.getModel(),
                AiConstants.GEMINI_GENERATE_CONTENT,
                geminiConfig.getApiKey());
    }

    private GeminiRequest buildRequest(String prompt) {

        GeminiPart part = GeminiPart.builder()
                .text(prompt)
                .build();

        GeminiContent content = GeminiContent.builder()
                .role(AiConstants.USER_ROLE)
                .parts(List.of(part))
                .build();

        return GeminiRequest.builder()
                .contents(List.of(content))
                .build();
    }

    @Override
    public String generateResponse(String prompt) {

        try {

            GeminiRequest request = buildRequest(prompt);

            String url = buildRequestUrl();

            System.out.println("=================================");
            System.out.println("Gemini URL : " + url);
            System.out.println("=================================");

            GeminiResponse response = restClient.post()
                    .uri(buildRequestUrl())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(GeminiResponse.class);

            if (response == null
                    || response.getCandidates() == null
                    || response.getCandidates().isEmpty()) {

                throw new AiException("Empty response received from Gemini AI.");

            }

            if (response.getCandidates().get(0).getContent() == null
                    || response.getCandidates().get(0).getContent().getParts() == null
                    || response.getCandidates().get(0).getContent().getParts().isEmpty()) {

                throw new AiException("Invalid response received from Gemini AI.");

            }

            String aiResponse = response.getCandidates()
                    .get(0)
                    .getContent()
                    .getParts()
                    .get(0)
                    .getText();

            log.info("Gemini response generated successfully.");

            return aiResponse;
        } catch (Exception ex) {

            ex.printStackTrace();

            System.out.println("ERROR : " + ex.getMessage());

            Throwable cause = ex.getCause();

            while (cause != null) {
                System.out.println("CAUSE : " + cause.getMessage());
                cause = cause.getCause();
            }

            throw new RuntimeException(ex);
        }
    }
}