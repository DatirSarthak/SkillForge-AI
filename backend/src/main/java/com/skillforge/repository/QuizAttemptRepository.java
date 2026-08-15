package com.skillforge.repository;

import com.skillforge.entity.QuizAttempt;
import com.skillforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface QuizAttemptRepository
        extends JpaRepository<QuizAttempt, UUID> {

    List<QuizAttempt> findByUserOrderByCompletedAtDesc(
            User user
    );

    Optional<QuizAttempt> findByIdAndUser(
            UUID id,
            User user
    );

    boolean existsByQuizId(UUID quizId);

    List<QuizAttempt> findByQuizId(UUID quizId);
}