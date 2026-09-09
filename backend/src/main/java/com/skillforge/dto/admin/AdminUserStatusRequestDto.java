package com.skillforge.dto.admin;

import com.skillforge.entity.AccountStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserStatusRequestDto {
    @NotNull(message = "Account status is required.")
    private AccountStatus accountStatus;
}
