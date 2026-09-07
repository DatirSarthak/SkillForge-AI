package com.skillforge.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponseDto {

    private ChatAnalyticsDto chat;

    private NotesAnalyticsDto notes;

    private QuizAnalyticsDto quiz;

    private ResumeAnalyticsDto resume;

    private RoadmapAnalyticsDto roadmap;

    private List<ActivityTrendDto> activityTrend;
}