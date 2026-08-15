package com.skillforge.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "resume.review")
@Getter
@Setter
public class ResumeReviewProperties {

    private long maxFileSize = 5 * 1024 * 1024;

    private int maxExtractedCharacters = 30_000;

    private String cloudinaryFolder = "skillforge/resumes";
}