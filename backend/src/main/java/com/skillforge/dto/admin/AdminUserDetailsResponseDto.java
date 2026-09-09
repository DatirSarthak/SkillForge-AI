package com.skillforge.dto.admin;

import com.skillforge.entity.AccountStatus;
import com.skillforge.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserDetailsResponseDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private AccountStatus accountStatus;
    private Boolean emailVerified;
    private String profileImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private long conversations;
    private long messages;
    private long notes;
    private long quizzes;
    private long quizAttempts;
    private long resumeReviews;
    private long roadmaps;
    private long roadmapSteps;
    private long completedRoadmapSteps;
    private long notifications;
}
