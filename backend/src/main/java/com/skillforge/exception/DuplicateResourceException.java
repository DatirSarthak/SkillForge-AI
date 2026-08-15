package com.skillforge.exception;

import com.skillforge.constants.ErrorCodes;

public class DuplicateResourceException extends ConflictException {

    public DuplicateResourceException(String message) {
        super(
                message,
                ErrorCodes.DUPLICATE_RESOURCE
        );
    }
}