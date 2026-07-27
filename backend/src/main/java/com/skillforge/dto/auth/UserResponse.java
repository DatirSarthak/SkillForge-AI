package com.skillforge.dto.auth;

import com.skillforge.entity.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class UserResponse {

    private UUID id;

    private String firstName;

    private String lastName;

    private String email;

    private Role role;

    private Boolean emailVerified;

    private String profileImageUrl;

}