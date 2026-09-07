package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.analytics.AnalyticsResponseDto;
import com.skillforge.service.AnalyticsService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping
    public ApiResponse<AnalyticsResponseDto> getAnalytics(
            HttpServletRequest httpRequest
    ) {
        return ResponseUtil.success(
                "Analytics retrieved successfully.",
                analyticsService.getAnalytics(),
                httpRequest.getRequestURI()
        );
    }
}
