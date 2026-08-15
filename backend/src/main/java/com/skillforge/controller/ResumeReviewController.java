package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.resume.ResumeReviewResponseDto;
import com.skillforge.dto.resume.ResumeReviewSummaryDto;
import com.skillforge.service.ResumeReviewService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/resume-reviews")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class ResumeReviewController {

    private final ResumeReviewService resumeReviewService;

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<ResumeReviewResponseDto>>
    reviewResume(
            @RequestParam("file")
            MultipartFile file
    ) {

        ResumeReviewResponseDto response =
                resumeReviewService.reviewResume(file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.success(
                                "Resume reviewed successfully",
                                response
                        )
                );
    }

    @GetMapping
    public ResponseEntity<
            ApiResponse<Page<ResumeReviewSummaryDto>>
            > getHistory(

            @RequestParam(defaultValue = "0")
            @Min(0)
            int page,

            @RequestParam(defaultValue = "10")
            @Min(1)
            @Max(50)
            int size
    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<ResumeReviewSummaryDto> response =
                resumeReviewService.getReviewHistory(
                        pageable
                );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Resume review history fetched successfully",
                        response
                )
        );
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<
            ApiResponse<ResumeReviewResponseDto>
            > getReview(
            @PathVariable UUID reviewId
    ) {

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Resume review fetched successfully",
                        resumeReviewService.getReview(
                                reviewId
                        )
                )
        );
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Void>>
    deleteReview(
            @PathVariable UUID reviewId
    ) {

        resumeReviewService.deleteReview(
                reviewId
        );

        return ResponseEntity.ok(
                ApiResponse.success(
                        "Resume review deleted successfully",
                        null
                )
        );
    }
}
