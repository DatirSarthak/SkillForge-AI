package com.skillforge.exception;

import com.skillforge.constants.ErrorCodes;

public class ConflictException extends ApiException {

    public ConflictException(String message) {
        super(message, ErrorCodes.DUPLICATE_RESOURCE);
    }
}