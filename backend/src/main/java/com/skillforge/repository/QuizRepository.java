package com.skillforge.repository;

import com.skillforge.entity.Quiz;
import com.skillforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuizRepository
        extends JpaRepository<Quiz, UUID> {

    List<Quiz> findByUserOrderByCreatedAtDesc(
            User user
    );

    Optional<Quiz> findByIdAndUser(
            UUID id,
            User user
    );
}