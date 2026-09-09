package com.skillforge.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponseDto {
    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;
    private long lockedUsers;
    private long verifiedUsers;
    private long unverifiedUsers;
    private long totalConversations;
    private long totalMessages;
    private long totalNotes;
    private long totalQuizzes;
    private long totalQuizAttempts;
    private long totalResumeReviews;
    private long totalRoadmaps;
    private long totalRoadmapSteps;
    private long completedRoadmapSteps;
    private List<AdminUserResponseDto> recentUsers;
}
