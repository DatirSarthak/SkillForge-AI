package com.skillforge.repository;

import com.skillforge.entity.ChatMessage;
import com.skillforge.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {

    List<ChatMessage> findByConversationOrderByCreatedAtAsc(
            Conversation conversation
    );

}
