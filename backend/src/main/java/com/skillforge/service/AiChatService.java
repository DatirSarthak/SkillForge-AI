package com.skillforge.service;

import com.skillforge.dto.ai.ChatRequestDto;
import com.skillforge.dto.ai.ChatResponseDto;
import com.skillforge.dto.ai.ConversationDto;
import com.skillforge.dto.ai.ConversationSummaryDto;

import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;

public interface AiChatService {

    ChatResponseDto chat(ChatRequestDto request);

    ChatResponseDto streamChat(
            ChatRequestDto request,
            Consumer<String> onChunk);

    ConversationDto getConversation(UUID conversationId);

    List<ConversationSummaryDto> getUserConversations();

    void deleteConversation(UUID conversationId);

    void renameConversation(
            UUID conversationId,
            String title);
}