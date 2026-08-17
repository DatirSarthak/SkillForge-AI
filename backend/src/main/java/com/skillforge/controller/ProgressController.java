package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.progress.RoadmapProgressResponseDto;
import com.skillforge.dto.progress.UpdateRoadmapStepProgressRequestDto;
import com.skillforge.service.ProgressService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/ai/roadmaps")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @GetMapping("/{roadmapId}/progress")
    public ResponseEntity<ApiResponse<RoadmapProgressResponseDto>> getRoadmapProgress(
            @PathVariable UUID roadmapId,
            HttpServletRequest httpRequest
    ) {
        RoadmapProgressResponseDto response =
                progressService.getRoadmapProgress(roadmapId);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Roadmap progress retrieved successfully.",
                        response,
                        httpRequest.getRequestURI()
                )
        );
    }

    @PatchMapping("/{roadmapId}/steps/{stepId}/progress")
    public ResponseEntity<ApiResponse<RoadmapProgressResponseDto>> updateStepProgress(
            @PathVariable UUID roadmapId,
            @PathVariable UUID stepId,
            @Valid @RequestBody UpdateRoadmapStepProgressRequestDto request,
            HttpServletRequest httpRequest
    ) {
        RoadmapProgressResponseDto response =
                progressService.updateStepProgress(roadmapId, stepId, request);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        request.completed()
                                ? "Roadmap step marked as completed."
                                : "Roadmap step marked as incomplete.",
                        response,
                        httpRequest.getRequestURI()
                )
        );
    }
}
