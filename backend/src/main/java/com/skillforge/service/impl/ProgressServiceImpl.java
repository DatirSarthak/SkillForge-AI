package com.skillforge.service.impl;

import com.skillforge.dto.progress.RoadmapProgressResponseDto;
import com.skillforge.dto.progress.RoadmapStepProgressDto;
import com.skillforge.dto.progress.UpdateRoadmapStepProgressRequestDto;
import com.skillforge.entity.Roadmap;
import com.skillforge.entity.RoadmapStep;
import com.skillforge.entity.RoadmapStepProgress;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.RoadmapRepository;
import com.skillforge.repository.RoadmapStepProgressRepository;
import com.skillforge.service.NotificationService;
import com.skillforge.service.ProgressService;
import com.skillforge.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProgressServiceImpl implements ProgressService {

    private final UserService userService;
    private final RoadmapRepository roadmapRepository;
    private final RoadmapStepProgressRepository progressRepository;
    private final NotificationService notificationService;

    @Override
    @Transactional(readOnly = true)
    public RoadmapProgressResponseDto getRoadmapProgress(UUID roadmapId) {
        Roadmap roadmap = getOwnedRoadmap(roadmapId);
        return buildProgressResponse(roadmap);
    }

    @Override
    public RoadmapProgressResponseDto updateStepProgress(
            UUID roadmapId,
            UUID stepId,
            UpdateRoadmapStepProgressRequestDto request
    ) {
        Roadmap roadmap = getOwnedRoadmap(roadmapId);

        RoadmapStep step = roadmap.getSteps()
                .stream()
                .filter(item -> item.getId().equals(stepId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap step not found."));

        RoadmapStepProgress progress = progressRepository
                .findByRoadmapStepId(stepId)
                .orElseGet(() -> RoadmapStepProgress.builder()
                        .roadmapStep(step)
                        .completed(false)
                        .build());

        boolean wasCompleted = Boolean.TRUE.equals(progress.getCompleted());
        boolean completed = request.completed();

        progress.setCompleted(completed);
        progress.setCompletedAt(completed ? LocalDateTime.now() : null);
        progressRepository.save(progress);

        if (completed && !wasCompleted) {
            RoadmapProgressResponseDto updatedProgress = buildProgressResponse(roadmap);

            notificationService.createNotification(
                    userService.getCurrentUserEntity().getId(),
                    updatedProgress.progressPercentage().compareTo(BigDecimal.valueOf(100)) == 0
                            ? com.skillforge.entity.NotificationType.ROADMAP_COMPLETED
                            : com.skillforge.entity.NotificationType.ROADMAP_PROGRESS,
                    updatedProgress.progressPercentage().compareTo(BigDecimal.valueOf(100)) == 0
                            ? "Roadmap completed"
                            : "Learning progress updated",
                    updatedProgress.progressPercentage().compareTo(BigDecimal.valueOf(100)) == 0
                            ? "Congratulations! You completed your roadmap: " + roadmap.getTitle()
                            : "You completed \"" + step.getTitle() + "\". Keep going!",
                    "/ai-roadmap/" + roadmap.getId()
            );
        }

        log.info(
                "Roadmap step progress updated. roadmapId={}, stepId={}, completed={}, userId={}",
                roadmapId,
                stepId,
                completed,
                userService.getCurrentUserEntity().getId()
        );

        return buildProgressResponse(roadmap);
    }

    private Roadmap getOwnedRoadmap(UUID roadmapId) {
        User currentUser = userService.getCurrentUserEntity();

        return roadmapRepository
                .findByIdAndUser(roadmapId, currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found."));
    }

    private RoadmapProgressResponseDto buildProgressResponse(Roadmap roadmap) {
        List<RoadmapStep> steps = roadmap.getSteps() == null
                ? List.of()
                : roadmap.getSteps().stream()
                .sorted(Comparator.comparing(RoadmapStep::getStepOrder))
                .toList();

        List<RoadmapStepProgress> savedProgress =
                progressRepository.findByRoadmapStepRoadmapId(roadmap.getId());

        Map<UUID, RoadmapStepProgress> progressByStepId = savedProgress.stream()
                .collect(Collectors.toMap(
                        progress -> progress.getRoadmapStep().getId(),
                        Function.identity()
                ));

        List<RoadmapStepProgressDto> stepProgress = steps.stream()
                .map(step -> {
                    RoadmapStepProgress progress = progressByStepId.get(step.getId());
                    boolean completed = progress != null && Boolean.TRUE.equals(progress.getCompleted());

                    return new RoadmapStepProgressDto(
                            step.getId(),
                            step.getStepOrder(),
                            completed,
                            progress == null ? null : progress.getCompletedAt()
                    );
                })
                .toList();

        int totalSteps = steps.size();
        int completedSteps = (int) stepProgress.stream()
                .filter(item -> Boolean.TRUE.equals(item.completed()))
                .count();

        BigDecimal percentage = totalSteps == 0
                ? BigDecimal.ZERO.setScale(2)
                : BigDecimal.valueOf(completedSteps)
                .multiply(BigDecimal.valueOf(100))
                .divide(BigDecimal.valueOf(totalSteps), 2, RoundingMode.HALF_UP);

        RoadmapStepProgressDto nextStep = stepProgress.stream()
                .filter(item -> !Boolean.TRUE.equals(item.completed()))
                .findFirst()
                .orElse(null);

        LocalDateTime lastCompletedAt = stepProgress.stream()
                .map(RoadmapStepProgressDto::completedAt)
                .filter(java.util.Objects::nonNull)
                .max(LocalDateTime::compareTo)
                .orElse(null);

        return new RoadmapProgressResponseDto(
                roadmap.getId(),
                totalSteps,
                completedSteps,
                percentage,
                nextStep == null ? null : nextStep.stepId(),
                nextStep == null ? null : nextStep.stepOrder(),
                lastCompletedAt,
                stepProgress
        );
    }
}
