package com.skillforge.dto.resume;

import java.time.LocalDateTime;
import java.util.UUID;

public record ResumeReviewSummaryDto(

        UUID id,

        String fileName,

        String fileType,

        long fileSize,

        Integer atsScore,

        LocalDateTime createdAt
) {
}
