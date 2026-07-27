package com.skillforge.service;

import com.skillforge.dto.auth.AuthResponse;
import com.skillforge.dto.auth.LoginRequest;
import com.skillforge.dto.auth.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}