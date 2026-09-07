package com.skillforge.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalyticsDto {

    private long totalReviews;

    private BigDecimal averageAtsScore;

    private BigDecimal bestAtsScore;
}
