package com.skillforge.mapper;

import com.skillforge.dto.admin.AdminUserResponseDto;
import com.skillforge.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdminMapper {

    AdminUserResponseDto toUserResponseDto(User user);
}