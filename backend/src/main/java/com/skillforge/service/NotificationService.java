package com.skillforge.service;

import com.skillforge.dto.notification.NotificationDto;
import com.skillforge.dto.notification.NotificationListResponseDto;
import com.skillforge.entity.NotificationType;

import java.util.UUID;

public interface NotificationService {

    NotificationListResponseDto getNotifications(int limit);

    long getUnreadCount();

    NotificationDto markAsRead(UUID notificationId);

    long markAllAsRead();

    void deleteNotification(UUID notificationId);

    void createNotification(
            UUID userId,
            NotificationType type,
            String title,
            String message,
            String actionUrl
    );
}
