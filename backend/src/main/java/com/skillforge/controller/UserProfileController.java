package com.skillforge.controller;

import com.skillforge.constants.ApiMessages;
import com.skillforge.dto.user.ChangePasswordRequestDto;
import com.skillforge.dto.user.UpdateProfileRequestDto;
import com.skillforge.dto.user.UserProfileResponseDto;
import com.skillforge.service.UserProfileService;
import com.skillforge.util.ResponseUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {

        UserProfileResponseDto response = userProfileService.getProfile();

        return ResponseEntity.ok(
                ResponseUtil.success(
                        ApiMessages.PROFILE_FETCHED_SUCCESS,
                        response,
                        request.getRequestURI()
                )
        );
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @Valid @RequestBody UpdateProfileRequestDto profileRequest,
            HttpServletRequest request) {

        UserProfileResponseDto response =
                userProfileService.updateProfile(profileRequest);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        ApiMessages.PROFILE_UPDATED_SUCCESS,
                        response,
                        request.getRequestURI()
                )
        );
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @Valid @RequestBody ChangePasswordRequestDto passwordRequest,
            HttpServletRequest request) {

        userProfileService.changePassword(passwordRequest);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        ApiMessages.PASSWORD_CHANGED_SUCCESS,
                        request.getRequestURI()
                )
        );
    }
}