package com.skillforge.constants;

public final class ErrorCodes {

    private ErrorCodes() {
    }

    // Validation
    public static final String VALIDATION_ERROR = "VAL-001";

    // Authentication
    public static final String AUTHENTICATION_FAILED = "AUTH-001";
    public static final String ACCESS_DENIED = "AUTH-002";

    // Resource
    public static final String RESOURCE_NOT_FOUND = "RES-001";
    public static final String DUPLICATE_RESOURCE = "RES-002";

    // Request
    public static final String BAD_REQUEST = "REQ-001";

    // Server
    public static final String INTERNAL_SERVER_ERROR = "SRV-001";
}