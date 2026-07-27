package com.skillforge.exception;

import com.skillforge.constants.ErrorCodes;

public class ForbiddenException extends ApiException {

    public ForbiddenException(String message) {
        super(message, ErrorCodes.ACCESS_DENIED);
    }
}