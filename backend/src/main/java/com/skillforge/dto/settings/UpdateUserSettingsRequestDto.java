package com.skillforge.dto.settings;

import com.skillforge.entity.ThemePreference;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserSettingsRequestDto {

    @NotNull(message = "Theme preference is required.")
    private ThemePreference theme;

    @NotNull(message = "Email notification preference is required.")
    private Boolean emailNotifications;

    @NotNull(message = "Push notification preference is required.")
    private Boolean pushNotifications;

    @NotNull(message = "Learning reminder preference is required.")
    private Boolean learningReminders;
}
