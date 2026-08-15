package com.skillforge.repository;

import com.skillforge.entity.ResumeReview;
import com.skillforge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

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
}
