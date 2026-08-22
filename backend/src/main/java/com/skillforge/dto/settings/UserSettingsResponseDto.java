package com.skillforge.dto.settings;

import com.skillforge.entity.ThemePreference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSettingsResponseDto {

    private ThemePreference theme;

    private Boolean emailNotifications;

    private Boolean pushNotifications;

    private Boolean learningReminders;
}
