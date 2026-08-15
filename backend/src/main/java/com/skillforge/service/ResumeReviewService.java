package com.skillforge.service;

import com.skillforge.dto.resume.ResumeReviewResponseDto;
import com.skillforge.dto.resume.ResumeReviewSummaryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface ResumeReviewService {

    ResumeReviewResponseDto reviewResume(
            MultipartFile file
    );

    Page<ResumeReviewSummaryDto> getReviewHistory(
            Pageable pageable
    );

    ResumeReviewResponseDto getReview(
            UUID reviewId
    );

    void deleteReview(
            UUID reviewId
    );
}