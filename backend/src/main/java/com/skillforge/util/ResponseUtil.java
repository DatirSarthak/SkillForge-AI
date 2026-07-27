package com.skillforge.util;

import com.skillforge.dto.ApiResponse;

import java.time.LocalDateTime;

public final class ResponseUtil {

    private ResponseUtil() {
    }

    public static <T> ApiResponse<T> success(
            String message,
            T data,
            String path) {

        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .path(path)
                .build();
    }

    public static ApiResponse<Void> success(
            String message,
            String path) {

        return ApiResponse.<Void>builder()
                .success(true)
                .message(message)
                .timestamp(LocalDateTime.now())
                .path(path)
                .build();
    }
}