package com.skillforge.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        name = "roadmap_steps",
        indexes = {
                @Index(name = "idx_roadmap_step_roadmap_id", columnList = "roadmap_id"),
                @Index(name = "idx_roadmap_step_order", columnList = "roadmap_id, step_order")
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadmapStep {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "roadmap_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_roadmap_step_roadmap")
    )
    private Roadmap roadmap;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 50)
    private String difficulty;

    @Column(name = "step_order", nullable = false)
    private Integer stepOrder;

    @Column(name = "project_suggestion", columnDefinition = "TEXT")
    private String projectSuggestion;

    @Column(name = "estimated_duration", length = 100)
    private String estimatedDuration;

    @OneToOne(
            mappedBy = "roadmapStep",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private RoadmapStepProgress progress;

    @ElementCollection
    @CollectionTable(
            name = "roadmap_step_objectives",
            joinColumns = @JoinColumn(name = "roadmap_step_id")
    )
    @Column(name = "objective", nullable = false, columnDefinition = "TEXT")
    @OrderColumn(name = "objective_order")
    @Builder.Default
    private List<String> learningObjectives = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "roadmap_step_subtopics",
            joinColumns = @JoinColumn(name = "roadmap_step_id")
    )
    @Column(name = "subtopic", nullable = false, length = 300)
    @OrderColumn(name = "subtopic_order")
    @Builder.Default
    private List<String> subtopics = new ArrayList<>();
}
