package com.skillforge.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponseDto {

    private UserSummaryDto userSummary;

    private StatisticsDto statistics;

    private List<QuickActionDto> quickActions;

    private List<RecentActivityDto> recentActivities;
}