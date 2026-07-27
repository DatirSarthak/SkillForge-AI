package com.skillforge.exception;

import com.skillforge.constants.ErrorCodes;

public class UnauthorizedException extends ApiException {

    public UnauthorizedException(String message) {
        super(message, ErrorCodes.AUTHENTICATION_FAILED);
    }
}