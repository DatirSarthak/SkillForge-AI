package com.skillforge.repository;

import com.skillforge.entity.ResumeReview;
import com.skillforge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

public interface ResumeReviewRepository
        extends JpaRepository<ResumeReview, UUID> {

    Page<ResumeReview> findByUserOrderByCreatedAtDesc(
            User user,
            Pageable pageable
    );

    Optional<ResumeReview> findByIdAndUser(
            UUID id,
            User user
    );

    long countByUser(User user);

    @Query("""
            SELECT COALESCE(AVG(r.atsScore), 0)
            FROM ResumeReview r
            WHERE r.user = :user
            """)
    BigDecimal findAverageAtsScoreByUser(
            @Param("user") User user
    );

    @Query("""
            SELECT COALESCE(MAX(r.atsScore), 0)
            FROM ResumeReview r
            WHERE r.user = :user
            """)
    BigDecimal findBestAtsScoreByUser(
            @Param("user") User user
    );

    @Query("""
            SELECT r
            FROM ResumeReview r
            WHERE r.user = :user
              AND (
                    LOWER(r.fileName) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(COALESCE(r.summary, ''))
                       LIKE LOWER(CONCAT('%', :keyword, '%'))
                  )
            ORDER BY r.updatedAt DESC
            """)
    Page<ResumeReview> searchByUser(
            @Param("user") User user,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
