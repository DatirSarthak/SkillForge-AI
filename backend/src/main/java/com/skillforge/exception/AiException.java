package com.skillforge.exception;

public class AiException extends ApiException {

    public AiException(String message) {
        super(message, "AI-001");
    }

}
