package com.skillforge.service;

import com.skillforge.dto.settings.UpdateUserSettingsRequestDto;
import com.skillforge.dto.settings.UserSettingsResponseDto;

public interface UserSettingsService {

    UserSettingsResponseDto getSettings();

    UserSettingsResponseDto updateSettings(
            UpdateUserSettingsRequestDto request
    );
}
