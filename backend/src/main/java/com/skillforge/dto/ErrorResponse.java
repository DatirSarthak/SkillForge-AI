package com.skillforge.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ErrorResponse {

    private final boolean success;

    private final String errorCode;

    private final String message;

    private final LocalDateTime timestamp;

    private final String path;

}