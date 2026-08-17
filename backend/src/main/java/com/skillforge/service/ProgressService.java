package com.skillforge.service;

import com.skillforge.dto.progress.RoadmapProgressResponseDto;
import com.skillforge.dto.progress.UpdateRoadmapStepProgressRequestDto;

import java.util.UUID;

public interface ProgressService {

    RoadmapProgressResponseDto getRoadmapProgress(UUID roadmapId);

    RoadmapProgressResponseDto updateStepProgress(
            UUID roadmapId,
            UUID stepId,
            UpdateRoadmapStepProgressRequestDto request
    );
}
