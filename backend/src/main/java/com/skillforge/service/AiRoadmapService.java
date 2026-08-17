package com.skillforge.service;

import com.skillforge.dto.roadmap.RoadmapGenerateRequestDto;
import com.skillforge.dto.roadmap.RoadmapResponseDto;
import com.skillforge.dto.roadmap.RoadmapSummaryDto;

import java.util.List;
import java.util.UUID;

public interface AiRoadmapService {

    RoadmapResponseDto generateRoadmap(
            RoadmapGenerateRequestDto request
    );

    List<RoadmapSummaryDto> getUserRoadmaps();

    RoadmapResponseDto getRoadmap(UUID roadmapId);

    void deleteRoadmap(UUID roadmapId);
}