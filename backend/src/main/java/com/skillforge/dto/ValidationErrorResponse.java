package com.skillforge.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Builder
public class ValidationErrorResponse {

    private final boolean success;

    private final String errorCode;

    private final String message;

    private final Map<String, String> errors;

    private final LocalDateTime timestamp;

    private final String path;

}