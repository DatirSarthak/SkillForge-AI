package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.dashboard.DashboardResponseDto;
import com.skillforge.service.DashboardService;
import com.skillforge.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;


    @GetMapping
    public ApiResponse<DashboardResponseDto> getDashboard(
            Authentication authentication) {

        DashboardResponseDto dashboard =
                dashboardService.getDashboard(authentication);

        return ResponseUtil.success(
                "Dashboard retrieved successfully.",
                dashboard,
                "/api/dashboard"
        );
    }
}