package com.skillforge.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSummaryDto {

    private String firstName;

    private String lastName;

    private String email;

    private String profileImageUrl;

    private boolean emailVerified;
}