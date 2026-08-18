package com.skillforge.dto.notification;

import java.util.List;

public record NotificationListResponseDto(
        List<NotificationDto> notifications,
        long unreadCount
) {
}
