package com.skillforge.service;

import com.skillforge.dto.ai.ChatRequestDto;
import com.skillforge.dto.ai.ChatResponseDto;
import com.skillforge.dto.ai.ConversationDto;
import com.skillforge.dto.ai.ConversationSummaryDto;

import java.util.List;
import java.util.UUID;

public interface AiChatService {

    ChatResponseDto chat(ChatRequestDto request);

    ConversationDto getConversation(UUID conversationId);

    List<ConversationSummaryDto> getUserConversations();

    void deleteConversation(UUID conversationId);

    // NEW
    void renameConversation(UUID conversationId, String title);

}