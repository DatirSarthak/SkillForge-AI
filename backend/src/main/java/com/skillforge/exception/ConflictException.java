package com.skillforge.exception;

public class ConflictException extends ApiException {

    public ConflictException(
            String message,
            String errorCode
    ) {
        super(message, errorCode);
    }
}