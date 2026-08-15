package com.skillforge.dto.resume;

import java.util.UUID;

public record ResumeUploadResponseDto(

        UUID reviewId,

        String fileName,

        String message
) {
}