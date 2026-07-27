package com.skillforge.exception;

import com.skillforge.constants.ErrorCodes;

public class ResourceNotFoundException extends ApiException {

    public ResourceNotFoundException(String message) {
        super(message, ErrorCodes.RESOURCE_NOT_FOUND);
    }
}