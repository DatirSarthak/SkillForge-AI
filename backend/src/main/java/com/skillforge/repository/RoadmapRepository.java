package com.skillforge.repository;

import com.skillforge.entity.Roadmap;
import com.skillforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoadmapRepository
        extends JpaRepository<Roadmap, UUID> {

    List<Roadmap> findByUserOrderByCreatedAtDesc(
            User user
    );

    Optional<Roadmap> findByIdAndUser(
            UUID id,
            User user
    );
}
