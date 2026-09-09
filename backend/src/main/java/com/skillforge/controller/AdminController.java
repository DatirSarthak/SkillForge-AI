package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.admin.AdminDashboardResponseDto;
import com.skillforge.dto.admin.AdminUserDetailsResponseDto;
import com.skillforge.dto.admin.AdminUserFilterRequestDto;
import com.skillforge.dto.admin.AdminUserResponseDto;
import com.skillforge.dto.admin.AdminUserStatusRequestDto;
import com.skillforge.service.AdminService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ApiResponse<AdminDashboardResponseDto> getDashboard(
            HttpServletRequest request
    ) {
        return ResponseUtil.success(
                "Admin dashboard retrieved successfully.",
                adminService.getDashboard(),
                request.getRequestURI()
        );
    }

    @GetMapping("/users")
    public ApiResponse<Page<AdminUserResponseDto>> getUsers(
            @Valid @ModelAttribute AdminUserFilterRequestDto filter,
            HttpServletRequest request
    ) {
        return ResponseUtil.success(
                "Admin users retrieved successfully.",
                adminService.getUsers(filter),
                request.getRequestURI()
        );
    }

    @GetMapping("/users/{userId}")
    public ApiResponse<AdminUserDetailsResponseDto> getUserDetails(
            @PathVariable UUID userId,
            HttpServletRequest request
    ) {
        return ResponseUtil.success(
                "Admin user details retrieved successfully.",
                adminService.getUserDetails(userId),
                request.getRequestURI()
        );
    }

    @PatchMapping("/users/{userId}/status")
    public ApiResponse<AdminUserDetailsResponseDto> updateUserStatus(
            @PathVariable UUID userId,
            @Valid @RequestBody AdminUserStatusRequestDto statusRequest,
            HttpServletRequest request
    ) {
        return ResponseUtil.success(
                "User account status updated successfully.",
                adminService.updateUserStatus(userId, statusRequest),
                request.getRequestURI()
        );
    }
}
