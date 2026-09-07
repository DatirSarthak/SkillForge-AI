package com.skillforge.repository;

import com.skillforge.entity.QuizAttempt;
import com.skillforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
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

    long countByUser(User user);

    @Query("""
            SELECT COALESCE(AVG(a.percentage), 0)
            FROM QuizAttempt a
            WHERE a.user = :user
            """)
    BigDecimal findAveragePercentageByUser(
            @Param("user") User user
    );

    @Query("""
            SELECT COALESCE(MAX(a.percentage), 0)
            FROM QuizAttempt a
            WHERE a.user = :user
            """)
    BigDecimal findBestPercentageByUser(
            @Param("user") User user
    );
}