package com.skillforge.config;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@Slf4j
public class GeminiConfig {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    @Value("${gemini.base-url}")
    private String baseUrl;

    @PostConstruct
    public void verifyConfiguration() {

        log.info(
                "Gemini configuration loaded. apiKeyPresent={}, model={}",
                apiKey != null && !apiKey.isBlank(),
                model
        );
    }
}