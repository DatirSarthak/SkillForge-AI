package com.skillforge.service;

import com.skillforge.dto.dashboard.DashboardResponseDto;
import org.springframework.security.core.Authentication;

public interface DashboardService {

    DashboardResponseDto getDashboard(Authentication authentication);

}
