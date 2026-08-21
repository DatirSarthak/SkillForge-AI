package com.skillforge.exception;

import com.skillforge.constants.ErrorCodes;

public class FileValidationException extends ApiException {

    public FileValidationException(String message) {
        super(message, ErrorCodes.VALIDATION_ERROR);
    }

    public FileValidationException(String message, Throwable cause) {
        super(message, ErrorCodes.VALIDATION_ERROR);
        initCause(cause);
    }
}
