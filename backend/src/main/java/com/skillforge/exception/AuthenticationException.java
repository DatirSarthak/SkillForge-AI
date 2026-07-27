package com.skillforge.exception;

public class AuthenticationException extends UnauthorizedException {

    public AuthenticationException(String message) {
        super(message);
    }
}