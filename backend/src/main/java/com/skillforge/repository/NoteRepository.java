package com.skillforge.repository;

import com.skillforge.entity.Note;
import com.skillforge.entity.User;
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
}
