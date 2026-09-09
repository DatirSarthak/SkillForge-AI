package com.skillforge.dto.admin;

import com.skillforge.entity.AccountStatus;
import com.skillforge.entity.Role;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserFilterRequestDto {
    private String search;
    private Role role;
    private AccountStatus status;

    @Min(0)
    private int page = 0;

    @Min(1)
    @Max(100)
    private int size = 20;

    private String sortBy = "createdAt";
    private String direction = "desc";
}
