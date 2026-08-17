package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.roadmap.RoadmapGenerateRequestDto;
import com.skillforge.dto.roadmap.RoadmapResponseDto;
import com.skillforge.dto.roadmap.RoadmapSummaryDto;
import com.skillforge.service.AiRoadmapService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ai/roadmaps")
@RequiredArgsConstructor
public class AiRoadmapController {

    private final AiRoadmapService aiRoadmapService;

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<RoadmapResponseDto>> generateRoadmap(
            @Valid @RequestBody RoadmapGenerateRequestDto request,
            HttpServletRequest httpRequest
    ) {

        RoadmapResponseDto response =
                aiRoadmapService.generateRoadmap(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ResponseUtil.success(
                                "Roadmap generated successfully.",
                                response,
                                httpRequest.getRequestURI()
                        )
                );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RoadmapSummaryDto>>> getUserRoadmaps(
            HttpServletRequest httpRequest
    ) {

        List<RoadmapSummaryDto> roadmaps =
                aiRoadmapService.getUserRoadmaps();

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Roadmap history retrieved successfully.",
                        roadmaps,
                        httpRequest.getRequestURI()
                )
        );
    }

    @GetMapping("/{roadmapId}")
    public ResponseEntity<ApiResponse<RoadmapResponseDto>> getRoadmap(
            @PathVariable UUID roadmapId,
            HttpServletRequest httpRequest
    ) {

        RoadmapResponseDto response =
                aiRoadmapService.getRoadmap(roadmapId);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Roadmap retrieved successfully.",
                        response,
                        httpRequest.getRequestURI()
                )
        );
    }

    @DeleteMapping("/{roadmapId}")
    public ResponseEntity<ApiResponse<Void>> deleteRoadmap(
            @PathVariable UUID roadmapId,
            HttpServletRequest httpRequest
    ) {

        aiRoadmapService.deleteRoadmap(roadmapId);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Roadmap deleted successfully.",
                        httpRequest.getRequestURI()
                )
        );
    }
}
