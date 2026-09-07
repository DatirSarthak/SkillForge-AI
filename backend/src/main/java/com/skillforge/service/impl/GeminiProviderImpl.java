package com.skillforge.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.config.GeminiConfig;
import com.skillforge.constants.AiConstants;
import com.skillforge.dto.ai.gemini.GeminiContent;
import com.skillforge.dto.ai.gemini.GeminiGenerationConfig;
import com.skillforge.dto.ai.gemini.GeminiPart;
import com.skillforge.dto.ai.gemini.GeminiRequest;
import com.skillforge.dto.ai.gemini.GeminiResponse;
import com.skillforge.dto.ai.gemini.GeminiThinkingConfig;
import com.skillforge.exception.AiException;
import com.skillforge.exception.AiServiceException;
import com.skillforge.service.AiProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiProviderImpl implements AiProvider {

        private final RestClient restClient;
        private final GeminiConfig geminiConfig;
        private final ObjectMapper objectMapper;

        private String buildRequestUrl() {

                return String.format(
                                "%s/%s%s?key=%s",
                                geminiConfig.getBaseUrl(),
                                geminiConfig.getModel(),
                                AiConstants.GEMINI_GENERATE_CONTENT,
                                geminiConfig.getApiKey());
        }

        private String buildStreamRequestUrl() {

                return String.format(
                                "%s/%s:streamGenerateContent?alt=sse&key=%s",
                                geminiConfig.getBaseUrl(),
                                geminiConfig.getModel(),
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

                GeminiThinkingConfig thinkingConfig = GeminiThinkingConfig.builder()
                                .thinkingLevel("low")
                                .build();

                GeminiGenerationConfig generationConfig = GeminiGenerationConfig.builder()
                                .thinkingConfig(thinkingConfig)
                                .build();

                return GeminiRequest.builder()
                                .contents(List.of(content))
                                .generationConfig(generationConfig)
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

                } catch (AiException ex) {

                        throw ex;

                } catch (Exception ex) {

                        log.error(
                                        "Unexpected Gemini integration error.",
                                        ex);

                        throw new AiServiceException(
                                        "AI service is temporarily unavailable.");
                }
        }

        @Override
        public void streamResponse(
                        String prompt,
                        Consumer<String> onChunk) {

                try {

                        GeminiRequest request = buildRequest(prompt);

                        restClient.post()
                                        .uri(buildStreamRequestUrl())
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .accept(MediaType.TEXT_EVENT_STREAM)
                                        .body(request)
                                        .exchange((clientRequest, clientResponse) -> {

                                                try (BufferedReader reader = new BufferedReader(
                                                                new InputStreamReader(
                                                                                clientResponse.getBody(),
                                                                                StandardCharsets.UTF_8))) {

                                                        String line;
                                                        int chunkCount = 0;

                                                        while ((line = reader.readLine()) != null) {

                                                                // SSE events contain "data:" lines
                                                                if (!line.startsWith("data:")) {
                                                                        continue;
                                                                }

                                                                String data = line.substring(5).trim();

                                                                if (data.isEmpty() || "[DONE]".equals(data)) {
                                                                        continue;
                                                                }

                                                                try {

                                                                        GeminiResponse response = objectMapper
                                                                                        .readValue(
                                                                                                        data,
                                                                                                        GeminiResponse.class);

                                                                        if (response.getCandidates() == null
                                                                                        || response.getCandidates()
                                                                                                        .isEmpty()) {
                                                                                continue;
                                                                        }

                                                                        var candidate = response.getCandidates().get(0);

                                                                        if (candidate.getContent() == null
                                                                                        || candidate.getContent()
                                                                                                        .getParts() == null
                                                                                        || candidate.getContent()
                                                                                                        .getParts()
                                                                                                        .isEmpty()) {
                                                                                continue;
                                                                        }

                                                                        String text = candidate
                                                                                        .getContent()
                                                                                        .getParts()
                                                                                        .get(0)
                                                                                        .getText();

                                                                        if (text != null && !text.isEmpty()) {

                                                                                chunkCount++;

                                                                                log.debug(
                                                                                                "Gemini stream chunk received. count={}, chars={}",
                                                                                                chunkCount,
                                                                                                text.length());

                                                                                onChunk.accept(text);
                                                                        }

                                                                } catch (Exception parseException) {

                                                                        log.error(
                                                                                        "Failed to parse Gemini streaming chunk.",
                                                                                        parseException);

                                                                        throw new AiServiceException(
                                                                                        "Invalid AI streaming response.");
                                                                }
                                                        }

                                                        log.info(
                                                                        "Gemini streaming completed. totalChunks={}",
                                                                        chunkCount);

                                                        return null;

                                                } catch (AiServiceException ex) {

                                                        throw ex;

                                                } catch (Exception ex) {

                                                        log.error(
                                                                        "Error while reading Gemini streaming response.",
                                                                        ex);

                                                        throw new AiServiceException(
                                                                        "AI streaming service is temporarily unavailable.");
                                                }
                                        });

                } catch (HttpClientErrorException.TooManyRequests ex) {

                        log.error(
                                        "Gemini streaming quota exceeded. status={}, response={}",
                                        ex.getStatusCode(),
                                        ex.getResponseBodyAsString());

                        throw new AiServiceException(
                                        "Daily AI quota exceeded. Please try again tomorrow.");

                } catch (RestClientResponseException ex) {

                        log.error(
                                        "Gemini streaming request failed. status={}, response={}",
                                        ex.getStatusCode(),
                                        ex.getResponseBodyAsString(),
                                        ex);

                        throw new AiServiceException(
                                        "Gemini API request failed: "
                                                        + ex.getStatusCode());

                } catch (AiServiceException ex) {

                        throw ex;

                } catch (Exception ex) {

                        log.error(
                                        "Unexpected Gemini streaming integration error.",
                                        ex);

                        throw new AiServiceException(
                                        "AI streaming service is temporarily unavailable.");
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