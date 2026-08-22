package com.skillforge.service.impl;

import com.skillforge.dto.settings.UpdateUserSettingsRequestDto;
import com.skillforge.dto.settings.UserSettingsResponseDto;
import com.skillforge.entity.User;
import com.skillforge.entity.UserSettings;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.UserRepository;
import com.skillforge.repository.UserSettingsRepository;
import com.skillforge.service.UserSettingsService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserSettingsServiceImpl implements UserSettingsService {

    private final UserSettingsRepository userSettingsRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserSettingsResponseDto getSettings() {

        User user = getAuthenticatedUser();

        UserSettings settings = userSettingsRepository
                .findByUser(user)
                .orElseGet(() -> createDefaultSettings(user));

        return mapToResponse(settings);
    }

    @Override
    public UserSettingsResponseDto updateSettings(
            UpdateUserSettingsRequestDto request) {

        User user = getAuthenticatedUser();

        UserSettings settings = userSettingsRepository
                .findByUser(user)
                .orElseGet(() -> createDefaultSettings(user));

        settings.setTheme(request.getTheme());
        settings.setEmailNotifications(request.getEmailNotifications());
        settings.setPushNotifications(request.getPushNotifications());
        settings.setLearningReminders(request.getLearningReminders());

        UserSettings updatedSettings =
                userSettingsRepository.save(settings);

        log.info(
                "Settings updated successfully for user: {}",
                user.getEmail()
        );

        return mapToResponse(updatedSettings);
    }

    private UserSettings createDefaultSettings(User user) {

        UserSettings settings = UserSettings.builder()
                .user(user)
                .build();

        return userSettingsRepository.save(settings);
    }

    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Authenticated user not found."
                        )
                );
    }

    private UserSettingsResponseDto mapToResponse(
            UserSettings settings) {

        return UserSettingsResponseDto.builder()
                .theme(settings.getTheme())
                .emailNotifications(settings.getEmailNotifications())
                .pushNotifications(settings.getPushNotifications())
                .learningReminders(settings.getLearningReminders())
                .build();
    }
}