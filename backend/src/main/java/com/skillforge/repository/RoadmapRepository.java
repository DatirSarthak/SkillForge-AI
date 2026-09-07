package com.skillforge.repository;

import com.skillforge.entity.Roadmap;
import com.skillforge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoadmapRepository extends JpaRepository<Roadmap, UUID> {

    List<Roadmap> findByUserOrderByCreatedAtDesc(
            User user
    );

    Optional<Roadmap> findByIdAndUser(
            UUID id,
            User user
    );

    List<Roadmap> findByUserOrderByCreatedAtDesc(
            User user,
            Pageable pageable
    );

    long countByUser(User user);

    @Query("""
            SELECT r
            FROM Roadmap r
            WHERE r.user = :user
              AND (
                    LOWER(r.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(r.goal) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(r.topic) LIKE LOWER(CONCAT('%', :keyword, '%'))
                    OR LOWER(r.targetRole) LIKE LOWER(CONCAT('%', :keyword, '%'))
                  )
            ORDER BY r.updatedAt DESC
            """)
    Page<Roadmap> searchByUser(
            @Param("user") User user,
            @Param("keyword") String keyword,
            Pageable pageable
    );
}
