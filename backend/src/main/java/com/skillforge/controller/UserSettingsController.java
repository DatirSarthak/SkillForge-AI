package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.settings.UpdateUserSettingsRequestDto;
import com.skillforge.dto.settings.UserSettingsResponseDto;
import com.skillforge.service.UserSettingsService;
import com.skillforge.util.ResponseUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class UserSettingsController {

    private final UserSettingsService userSettingsService;

    @GetMapping
    public ResponseEntity<ApiResponse<UserSettingsResponseDto>> getSettings(
            HttpServletRequest request) {

        UserSettingsResponseDto response =
                userSettingsService.getSettings();

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Settings fetched successfully.",
                        response,
                        request.getRequestURI()
                )
        );
    }

    @PutMapping
    public ResponseEntity<ApiResponse<UserSettingsResponseDto>> updateSettings(
            @Valid @RequestBody UpdateUserSettingsRequestDto settingsRequest,
            HttpServletRequest request) {

        UserSettingsResponseDto response =
                userSettingsService.updateSettings(settingsRequest);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Settings updated successfully.",
                        response,
                        request.getRequestURI()
                )
        );
    }
}