package com.skillforge.exception;

import com.skillforge.constants.ErrorCodes;

public class BadRequestException extends ApiException {

    public BadRequestException(String message) {
        super(message, ErrorCodes.BAD_REQUEST);
    }
}