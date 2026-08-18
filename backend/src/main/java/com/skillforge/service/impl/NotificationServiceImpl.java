package com.skillforge.service.impl;

import com.skillforge.dto.notification.NotificationDto;
import com.skillforge.dto.notification.NotificationListResponseDto;
import com.skillforge.entity.Notification;
import com.skillforge.entity.NotificationType;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.NotificationRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.NotificationService;
import com.skillforge.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private static final int DEFAULT_LIMIT = 20;
    private static final int MAX_LIMIT = 50;

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public NotificationListResponseDto getNotifications(int limit) {
        User currentUser = userService.getCurrentUserEntity();
        int safeLimit = Math.min(Math.max(limit, 1), MAX_LIMIT);

        List<NotificationDto> notifications = notificationRepository
                .findByUserOrderByCreatedAtDesc(
                        currentUser,
                        PageRequest.of(0, safeLimit)
                )
                .stream()
                .map(this::toDto)
                .toList();

        long unreadCount = notificationRepository.countByUserAndReadFalse(currentUser);

        return new NotificationListResponseDto(notifications, unreadCount);
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount() {
        User currentUser = userService.getCurrentUserEntity();
        return notificationRepository.countByUserAndReadFalse(currentUser);
    }

    @Override
    public NotificationDto markAsRead(UUID notificationId) {
        User currentUser = userService.getCurrentUserEntity();

        Notification notification = notificationRepository
                .findByIdAndUser(notificationId, currentUser)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found."));

        if (!Boolean.TRUE.equals(notification.getRead())) {
            notification.setRead(true);
            notification.setReadAt(LocalDateTime.now());
            notificationRepository.save(notification);
        }

        return toDto(notification);
    }

    @Override
    public long markAllAsRead() {
        User currentUser = userService.getCurrentUserEntity();

        return notificationRepository.markAllAsReadByUser(
                currentUser,
                LocalDateTime.now()
        );
    }

    @Override
    public void deleteNotification(UUID notificationId) {
        User currentUser = userService.getCurrentUserEntity();

        int deleted = notificationRepository.deleteByIdAndUser(
                notificationId,
                currentUser
        );

        if (deleted == 0) {
            throw new ResourceNotFoundException("Notification not found.");
        }
    }

    @Override
    public void createNotification(
            UUID userId,
            NotificationType type,
            String title,
            String message,
            String actionUrl
    ) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .message(message)
                .actionUrl(actionUrl)
                .read(false)
                .build();

        notificationRepository.save(notification);

        log.info(
                "Notification created. userId={}, type={}, title={}",
                userId,
                type,
                title
        );
    }

    private NotificationDto toDto(Notification notification) {
        return new NotificationDto(
                notification.getId(),
                notification.getType(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getActionUrl(),
                Boolean.TRUE.equals(notification.getRead()),
                notification.getReadAt(),
                notification.getCreatedAt()
        );
    }
}
