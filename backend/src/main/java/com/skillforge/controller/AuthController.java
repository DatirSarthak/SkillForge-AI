package com.skillforge.controller;

import com.skillforge.constants.ApiMessages;
import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.auth.AuthResponse;
import com.skillforge.dto.auth.LoginRequest;
import com.skillforge.dto.auth.RefreshTokenResponse;
import com.skillforge.dto.auth.RegisterRequest;
import com.skillforge.service.AuthService;
import com.skillforge.util.ResponseUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.skillforge.dto.auth.RefreshTokenRequest;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

        private final AuthService authService;

        @PostMapping("/register")
        public ResponseEntity<ApiResponse<AuthResponse>> register(
                        @Valid @RequestBody RegisterRequest request,
                        HttpServletRequest httpRequest) {

                AuthResponse response = authService.register(request);

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(
                                                ResponseUtil.success(
                                                                ApiMessages.USER_REGISTERED_SUCCESS,
                                                                response,
                                                                httpRequest.getRequestURI()));
        }

        @PostMapping("/login")
        public ResponseEntity<ApiResponse<AuthResponse>> login(
                        @Valid @RequestBody LoginRequest request,
                        HttpServletRequest httpRequest) {

                AuthResponse response = authService.login(request);

                return ResponseEntity.ok(
                                ResponseUtil.success(
                                                ApiMessages.LOGIN_SUCCESS,
                                                response,
                                                httpRequest.getRequestURI()));
        }

        @PostMapping("/refresh")
        public ResponseEntity<ApiResponse<RefreshTokenResponse>> refresh(
                        @Valid @RequestBody RefreshTokenRequest request,
                        HttpServletRequest httpRequest) {

                RefreshTokenResponse response = authService.refresh(request.getRefreshToken());

                return ResponseEntity.ok(
                                ResponseUtil.success(
                                                "Access token refreshed successfully",
                                                response,
                                                httpRequest.getRequestURI()));
        }

        @PostMapping("/logout")
        public ResponseEntity<ApiResponse<Void>> logout(
                        @Valid @RequestBody RefreshTokenRequest request,
                        HttpServletRequest httpRequest) {

                authService.logout(request.getRefreshToken());

                return ResponseEntity.ok(
                                ResponseUtil.success(
                                                "Logout successful",
                                                null,
                                                httpRequest.getRequestURI()));
        }
}