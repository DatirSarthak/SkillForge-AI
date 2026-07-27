package com.skillforge.controller;

import com.skillforge.constants.ApiMessages;
import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.auth.UserResponse;
import com.skillforge.service.UserService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(
            HttpServletRequest request) {

        UserResponse response = userService.getCurrentUser();

        return ResponseEntity.ok(
                ResponseUtil.success(
                        ApiMessages.USER_DETAILS_FETCHED,
                        response,
                        request.getRequestURI()
                )
        );
    }
}