package com.skillforge.constants;

public final class ApiMessages {

    private ApiMessages() {
    }

    // Authentication
    public static final String USER_REGISTERED_SUCCESS = "User registered successfully.";
    public static final String LOGIN_SUCCESS = "Login successful.";
    public static final String USER_DETAILS_FETCHED = "User details retrieved successfully.";

    // Common
    public static final String VALIDATION_FAILED = "Validation failed.";
    public static final String INTERNAL_SERVER_ERROR = "An unexpected error occurred.";
    public static final String RESOURCE_NOT_FOUND = "Requested resource not found.";
    public static final String ACCESS_DENIED = "Access denied.";
    public static final String UNAUTHORIZED = "Authentication required.";
    public static final String BAD_REQUEST = "Invalid request.";

    // User Profile
    public static final String PROFILE_FETCHED_SUCCESS = "Profile retrieved successfully.";

    public static final String PROFILE_UPDATED_SUCCESS = "Profile updated successfully.";

    public static final String PASSWORD_CHANGED_SUCCESS = "Password changed successfully.";

    public static final String CURRENT_PASSWORD_INCORRECT = "Current password is incorrect.";

    public static final String PASSWORD_CONFIRMATION_FAILED = "New password and confirm password do not match.";

    public static final String SAME_PASSWORD_NOT_ALLOWED = "New password must be different from current password.";
}