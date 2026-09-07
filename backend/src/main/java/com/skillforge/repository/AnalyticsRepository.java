package com.skillforge.repository;

import com.skillforge.dto.analytics.ActivityTrendDto;
import com.skillforge.entity.User;

import java.time.LocalDate;
import java.util.List;

public interface AnalyticsRepository {

    List<ActivityTrendDto> findActivityTrend(
            User user,
            LocalDate startDate,
            LocalDate endDate
    );
}