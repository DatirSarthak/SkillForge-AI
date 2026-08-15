package com.skillforge.exception;

public class InvalidResumeFileException
        extends RuntimeException {

    public InvalidResumeFileException(
            String message
    ) {
        super(message);
    }

    public InvalidResumeFileException(
            String message,
            Throwable cause
    ) {
        super(message, cause);
    }
}