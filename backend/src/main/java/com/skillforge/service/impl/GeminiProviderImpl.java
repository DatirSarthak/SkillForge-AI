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

import org.springframework.web.client.HttpClientErrorException;
import com.skillforge.exception.AiServiceException;
import org.springframework.web.client.RestClientResponseException;

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

            return response.getCandidates()
                    .get(0)
                    .getContent()
                    .getParts()
                    .get(0)
                    .getText();

        } catch (HttpClientErrorException.TooManyRequests ex) {

            log.error(
                    "Gemini API quota exceeded. status={}, response={}",
                    ex.getStatusCode(),
                    ex.getResponseBodyAsString());

            throw new AiServiceException(
                    "Daily AI quota exceeded. Please try again tomorrow.");

        } catch (RestClientResponseException ex) {

            log.error(
                    "Gemini API request failed. status={}, response={}",
                    ex.getStatusCode(),
                    ex.getResponseBodyAsString(),
                    ex);

            throw new AiServiceException(
                    "Gemini API request failed: "
                            + ex.getStatusCode());

        } catch (Exception ex) {

            log.error(
                    "Unexpected Gemini integration error.",
                    ex);

            throw new AiServiceException(
                    "AI service is temporarily unavailable.");
        }
    }

    @Override
    public String generateConversationTitle(String message) {

        String prompt = """
                Generate a short title for this conversation.

                Rules:
                - Maximum 5 words.
                - No quotes.
                - No punctuation.
                - Return only the title.

                User message:
                """ + message;

        return generateResponse(prompt).trim();

    }
}