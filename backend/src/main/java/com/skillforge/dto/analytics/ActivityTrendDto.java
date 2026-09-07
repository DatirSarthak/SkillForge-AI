package com.skillforge.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityTrendDto {

    private LocalDate date;

    private long chatMessages;

    private long notes;

    private long quizAttempts;

    private long resumeReviews;

    private long roadmapCompletions;

    private long totalActivity;
}