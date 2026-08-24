package com.skillforge.mapper;

import com.skillforge.dto.settings.UpdateUserSettingsRequestDto;
import com.skillforge.dto.settings.UserSettingsResponseDto;
import com.skillforge.entity.UserSettings;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface SettingsMapper {

    UserSettingsResponseDto toResponseDto(UserSettings userSettings);

    void updateEntity(
            UpdateUserSettingsRequestDto requestDto,
            @MappingTarget UserSettings userSettings
    );
}