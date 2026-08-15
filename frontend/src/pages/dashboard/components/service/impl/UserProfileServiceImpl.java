package com.skillforge.service.impl;

import com.skillforge.constants.ApiMessages;
import com.skillforge.dto.user.ChangePasswordRequestDto;
import com.skillforge.dto.user.UpdateProfileRequestDto;
import com.skillforge.dto.user.UserProfileResponseDto;
import com.skillforge.entity.User;
import com.skillforge.exception.BadRequestException;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.UserProfileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserProfileServiceImpl implements UserProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponseDto getProfile() {

        User user = getAuthenticatedUser();

        log.info("Profile fetched successfully for user: {}", user.getEmail());

        return mapToResponse(user);
    }

    @Override
    public UserProfileResponseDto updateProfile(UpdateProfileRequestDto request) {

        User user = getAuthenticatedUser();

        user.setFirstName(request.getFirstName().trim());
        user.setLastName(request.getLastName().trim());

        User updatedUser = userRepository.save(user);

        log.info("Profile updated successfully for user: {}", updatedUser.getEmail());

        return mapToResponse(updatedUser);
    }

    @Override
    public void changePassword(ChangePasswordRequestDto request) {

        User user = getAuthenticatedUser();

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException(ApiMessages.CURRENT_PASSWORD_INCORRECT);
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException(ApiMessages.PASSWORD_CONFIRMATION_FAILED);
        }

        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new BadRequestException(ApiMessages.SAME_PASSWORD_NOT_ALLOWED);
        }

        user.setPasswordHash(
                passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

        log.info("Password changed successfully for user: {}", user.getEmail());
    }

    private User getAuthenticatedUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(ApiMessages.RESOURCE_NOT_FOUND));
    }

    private UserProfileResponseDto mapToResponse(User user) {

        return UserProfileResponseDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .accountStatus(user.getAccountStatus())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}