package com.skillforge.repository;

import com.skillforge.entity.Quiz;
import com.skillforge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("""
            SELECT q
            FROM Quiz q
            WHERE q.user = :user
              AND (
                    LOWER(q.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(q.topic) LIKE LOWER(CONCAT('%', :keyword, '%'))
                  )
            ORDER BY q.updatedAt DESC
            """)
    Page<Quiz> searchByUser(
            @Param("user") User user,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
