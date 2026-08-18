package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.notification.NotificationDto;
import com.skillforge.dto.notification.NotificationListResponseDto;
import com.skillforge.service.NotificationService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<ApiResponse<NotificationListResponseDto>> getNotifications(
            @RequestParam(defaultValue = "20") int limit,
            HttpServletRequest request
    ) {
        NotificationListResponseDto response =
                notificationService.getNotifications(limit);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Notifications retrieved successfully.",
                        response,
                        request.getRequestURI()
                )
        );
    }

    @GetMapping("/unread-count")
    public ResponseEntity<ApiResponse<Long>> getUnreadCount(
            HttpServletRequest request
    ) {
        long unreadCount = notificationService.getUnreadCount();

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Unread notification count retrieved successfully.",
                        unreadCount,
                        request.getRequestURI()
                )
        );
    }

    @PatchMapping("/{notificationId}/read")
    public ResponseEntity<ApiResponse<NotificationDto>> markAsRead(
            @PathVariable UUID notificationId,
            HttpServletRequest request
    ) {
        NotificationDto response =
                notificationService.markAsRead(notificationId);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Notification marked as read.",
                        response,
                        request.getRequestURI()
                )
        );
    }

    @PatchMapping("/read-all")
    public ResponseEntity<ApiResponse<Long>> markAllAsRead(
            HttpServletRequest request
    ) {
        long updatedCount = notificationService.markAllAsRead();

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Notifications marked as read.",
                        updatedCount,
                        request.getRequestURI()
                )
        );
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<ApiResponse<Void>> deleteNotification(
            @PathVariable UUID notificationId,
            HttpServletRequest request
    ) {
        notificationService.deleteNotification(notificationId);

        return ResponseEntity.ok(
                ResponseUtil.success(
                        "Notification deleted successfully.",
                        request.getRequestURI()
                )
        );
    }
}
