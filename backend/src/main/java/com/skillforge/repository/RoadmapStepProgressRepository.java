package com.skillforge.repository;

import com.skillforge.entity.RoadmapStepProgress;
import com.skillforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoadmapStepProgressRepository
        extends JpaRepository<RoadmapStepProgress, UUID> {

    Optional<RoadmapStepProgress> findByRoadmapStepId(UUID roadmapStepId);

    List<RoadmapStepProgress> findByRoadmapStepRoadmapId(UUID roadmapId);

    @Query("""
            SELECT COUNT(p)
            FROM RoadmapStepProgress p
            WHERE p.roadmapStep.roadmap.user = :user
            """)
    long countByUser(
            @Param("user") User user
    );

    @Query("""
            SELECT COUNT(p)
            FROM RoadmapStepProgress p
            WHERE p.roadmapStep.roadmap.user = :user
              AND p.completed = true
            """)
    long countCompletedByUser(
            @Param("user") User user
    );

    @Query("""
            SELECT MAX(p.completedAt)
            FROM RoadmapStepProgress p
            WHERE p.roadmapStep.roadmap.user = :user
              AND p.completed = true
            """)
    LocalDateTime findLastCompletedAtByUser(
            @Param("user") User user
    );
}