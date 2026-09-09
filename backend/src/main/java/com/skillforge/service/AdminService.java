package com.skillforge.service;

import com.skillforge.dto.admin.AdminDashboardResponseDto;
import com.skillforge.dto.admin.AdminUserDetailsResponseDto;
import com.skillforge.dto.admin.AdminUserFilterRequestDto;
import com.skillforge.dto.admin.AdminUserStatusRequestDto;
import com.skillforge.dto.admin.AdminUserResponseDto;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface AdminService {
    AdminDashboardResponseDto getDashboard();

    Page<AdminUserResponseDto> getUsers(AdminUserFilterRequestDto request);

    AdminUserDetailsResponseDto getUserDetails(UUID userId);

    AdminUserDetailsResponseDto updateUserStatus(
            UUID userId,
            AdminUserStatusRequestDto request
    );
}
