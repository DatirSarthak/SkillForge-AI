package com.skillforge.exception;

import com.skillforge.constants.ApiMessages;
import com.skillforge.constants.ErrorCodes;
import com.skillforge.dto.ErrorResponse;
import com.skillforge.dto.ValidationErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

        private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ValidationErrorResponse> handleValidationException(
                        MethodArgumentNotValidException ex,
                        HttpServletRequest request) {

                Map<String, String> errors = new LinkedHashMap<>();

                for (FieldError error : ex.getBindingResult().getFieldErrors()) {
                        errors.put(error.getField(), error.getDefaultMessage());
                }

                ValidationErrorResponse response = ValidationErrorResponse.builder()
                                .success(false)
                                .errorCode(ErrorCodes.VALIDATION_ERROR)
                                .message(ApiMessages.VALIDATION_FAILED)
                                .errors(errors)
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();

                return ResponseEntity.badRequest().body(response);
        }

        @ExceptionHandler(ConstraintViolationException.class)
        public ResponseEntity<ErrorResponse> handleConstraintViolation(
                        ConstraintViolationException ex,
                        HttpServletRequest request) {

                ErrorResponse response = ErrorResponse.builder()
                                .success(false)
                                .errorCode(ErrorCodes.VALIDATION_ERROR)
                                .message(ex.getMessage())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();

                return ResponseEntity.badRequest().body(response);
        }

        @ExceptionHandler(ApiException.class)
        public ResponseEntity<ErrorResponse> handleApiException(
                        ApiException ex,
                        HttpServletRequest request) {

                LOGGER.warn("API Exception : {}", ex.getMessage());

                ErrorResponse response = ErrorResponse.builder()
                                .success(false)
                                .errorCode(ex.getErrorCode())
                                .message(ex.getMessage())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();

                return ResponseEntity.badRequest().body(response);
        }

        @ExceptionHandler(BadCredentialsException.class)
        public ResponseEntity<ErrorResponse> handleBadCredentials(
                        BadCredentialsException ex,
                        HttpServletRequest request) {

                LOGGER.warn("Authentication Failed : {}", ex.getMessage());

                ErrorResponse response = ErrorResponse.builder()
                                .success(false)
                                .errorCode(ErrorCodes.AUTHENTICATION_FAILED)
                                .message("Invalid email or password.")
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(response);
        }

        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<ErrorResponse> handleAccessDenied(
                        AccessDeniedException ex,
                        HttpServletRequest request) {

                ErrorResponse response = ErrorResponse.builder()
                                .success(false)
                                .errorCode(ErrorCodes.ACCESS_DENIED)
                                .message(ApiMessages.ACCESS_DENIED)
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();

                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(response);
        }

        @ExceptionHandler(FileStorageException.class)
        public ResponseEntity<ErrorResponse> handleFileStorageException(
                        FileStorageException ex,
                        HttpServletRequest request) {

                LOGGER.error("File storage error", ex);

                ErrorResponse response = ErrorResponse.builder()
                                .success(false)
                                .errorCode(ErrorCodes.INTERNAL_SERVER_ERROR)
                                .message("Unable to process file storage operation.")
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();

                return ResponseEntity
                                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(response);
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleException(
                        Exception ex,
                        HttpServletRequest request) {

                LOGGER.error("Unexpected Error", ex);

                ErrorResponse response = ErrorResponse.builder()
                                .success(false)
                                .errorCode(ErrorCodes.INTERNAL_SERVER_ERROR)
                                .message(ApiMessages.INTERNAL_SERVER_ERROR)
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(response);
        }

        @ExceptionHandler(AiServiceException.class)
        public ResponseEntity<ErrorResponse> handleAiServiceException(
                        AiServiceException ex,
                        HttpServletRequest request) {

                ErrorResponse error = ErrorResponse.builder()
                                .errorCode("AI-001")
                                .message(ex.getMessage())
                                .timestamp(LocalDateTime.now())
                                .path(request.getRequestURI())
                                .build();

                return ResponseEntity
                                .status(HttpStatus.SERVICE_UNAVAILABLE)
                                .body(error);
        }
}