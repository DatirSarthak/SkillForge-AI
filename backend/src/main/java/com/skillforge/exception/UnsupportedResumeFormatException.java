package com.skillforge.exception;

public class UnsupportedResumeFormatException
        extends RuntimeException {

    public UnsupportedResumeFormatException(
            String message
    ) {
        super(message);
    }
}
