package com.skillforge.repository;

import com.skillforge.entity.User;
import com.skillforge.entity.UserSettings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserSettingsRepository
        extends JpaRepository<UserSettings, UUID> {

    Optional<UserSettings> findByUser(User user);

    boolean existsByUser(User user);
}