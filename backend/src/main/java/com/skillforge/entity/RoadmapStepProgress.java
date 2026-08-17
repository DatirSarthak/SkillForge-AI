package com.skillforge.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "roadmap_step_progress",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_roadmap_step_progress_step",
                        columnNames = "roadmap_step_id"
                )
        },
        indexes = {
                @Index(name = "idx_roadmap_step_progress_step_id", columnList = "roadmap_step_id"),
                @Index(name = "idx_roadmap_step_progress_completed", columnList = "completed")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadmapStepProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "roadmap_step_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_roadmap_step_progress_step")
    )
    private RoadmapStep roadmapStep;

    @Column(nullable = false)
    @Builder.Default
    private Boolean completed = false;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
