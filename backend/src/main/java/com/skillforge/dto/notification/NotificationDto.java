package com.skillforge.dto.notification;

import com.skillforge.entity.NotificationType;

import java.time.LocalDateTime;
import java.util.UUID;

public record NotificationDto(
        UUID id,
        NotificationType type,
        String title,
        String message,
        String actionUrl,
        boolean read,
        LocalDateTime readAt,
        LocalDateTime createdAt
) {
}
