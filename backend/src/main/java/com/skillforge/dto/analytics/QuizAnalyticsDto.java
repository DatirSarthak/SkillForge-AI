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
public class QuizAnalyticsDto {

    private long totalQuizzes;

    private long totalAttempts;

    private BigDecimal averageScore;

    private BigDecimal bestScore;

    private long easyQuizzes;

    private long mediumQuizzes;

    private long hardQuizzes;
}
