package com.skillforge.repository;

import com.skillforge.entity.Notification;
import com.skillforge.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    List<Notification> findByUserOrderByCreatedAtDesc(
            User user,
            Pageable pageable
    );

    long countByUser(User user);

    long countByUserAndReadFalse(User user);

    Optional<Notification> findByIdAndUser(UUID id, User user);

    int deleteByIdAndUser(UUID id, User user);

    @Modifying
    @Query("""
            update Notification n
            set n.read = true,
                n.readAt = :readAt
            where n.user = :user
              and n.read = false
            """)
    int markAllAsReadByUser(
            @Param("user") User user,
            @Param("readAt") LocalDateTime readAt
    );
}
