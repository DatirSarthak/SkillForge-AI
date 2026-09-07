package com.skillforge.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapAnalyticsDto {

    private long totalRoadmaps;

    private long totalSteps;

    private long completedSteps;

    private BigDecimal progressPercentage;

    private LocalDateTime lastCompletedAt;
}