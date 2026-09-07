package com.skillforge.repository;

import com.skillforge.entity.Conversation;
import com.skillforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {

    List<Conversation> findByUserOrderByUpdatedAtDesc(User user);

    List<Conversation> findByUserOrderByUpdatedAtDesc(User user, Pageable pageable);

    long countByUser(User user);

    Optional<Conversation> findByIdAndUser(UUID id, User user);

}
