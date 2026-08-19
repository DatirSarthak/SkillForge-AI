package com.skillforge.repository;

import com.skillforge.entity.Note;
import com.skillforge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NoteRepository extends JpaRepository<Note, UUID> {

    List<Note> findByUserOrderByUpdatedAtDesc(User user);

    Optional<Note> findByIdAndUser(UUID id, User user);

    List<Note> findByUserAndTitleContainingIgnoreCaseOrderByUpdatedAtDesc(
            User user,
            String keyword
    );

    @org.springframework.data.jpa.repository.Query("""
            SELECT n
            FROM Note n
            WHERE n.user = :user
              AND LOWER(n.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
            ORDER BY n.updatedAt DESC
            """)
    Page<Note> searchByUser(
            @org.springframework.data.repository.query.Param("user") User user,
            @org.springframework.data.repository.query.Param("keyword") String keyword,
            Pageable pageable
    );
}
