package com.skillforge.repository;

import com.skillforge.entity.ChatMessage;
import com.skillforge.entity.Conversation;
import com.skillforge.entity.MessageSender;
import com.skillforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, UUID> {

    List<ChatMessage> findByConversationOrderByCreatedAtAsc(
            Conversation conversation
    );

    long countByConversation_User(User user);

    long countByConversation_UserAndSender(
            User user,
            MessageSender sender
    );
}
