package com.skillforge.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsDto {

    private int completedCourses;

    private int completedQuizzes;

    private int generatedNotes;

    private int aiChats;
}