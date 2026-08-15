package com.skillforge.exception;

public class ResumeFileSizeExceededException
        extends RuntimeException {

    public ResumeFileSizeExceededException(
            String message
    ) {
        super(message);
    }
}
