package com.skillforge.repository;

import com.skillforge.entity.RoadmapStepProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoadmapStepProgressRepository
        extends JpaRepository<RoadmapStepProgress, UUID> {

    Optional<RoadmapStepProgress> findByRoadmapStepId(UUID roadmapStepId);

    List<RoadmapStepProgress> findByRoadmapStepRoadmapId(UUID roadmapId);
}
