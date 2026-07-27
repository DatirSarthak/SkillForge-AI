package com.skillforge.exception;

import com.skillforge.constants.ErrorCodes;

public class InternalServerException extends ApiException {

    public InternalServerException(String message) {
        super(message, ErrorCodes.INTERNAL_SERVER_ERROR);
    }
}