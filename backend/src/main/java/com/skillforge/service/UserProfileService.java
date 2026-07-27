package com.skillforge.service;

import com.skillforge.dto.user.ChangePasswordRequestDto;
import com.skillforge.dto.user.UpdateProfileRequestDto;
import com.skillforge.dto.user.UserProfileResponseDto;

public interface UserProfileService {

    UserProfileResponseDto getProfile();

    UserProfileResponseDto updateProfile(UpdateProfileRequestDto request);

    void changePassword(ChangePasswordRequestDto request);
}