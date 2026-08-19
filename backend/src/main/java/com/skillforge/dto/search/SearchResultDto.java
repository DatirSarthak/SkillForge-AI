package com.skillforge.dto.search;

import java.time.LocalDateTime;
import java.util.UUID;

public record SearchResultDto(
        UUID id,
        String title,
        String type,
        String preview,
        LocalDateTime createdAt,
        String actionUrl
) {
}
