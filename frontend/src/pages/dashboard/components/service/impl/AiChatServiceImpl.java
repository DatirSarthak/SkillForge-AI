package com.skillforge.service.impl;

import com.skillforge.dto.ai.ChatRequestDto;
import com.skillforge.dto.ai.ChatResponseDto;
import com.skillforge.dto.ai.ConversationDto;
import com.skillforge.dto.ai.ConversationSummaryDto;
import com.skillforge.mapper.AiChatMapper;
import com.skillforge.repository.ChatMessageRepository;
import com.skillforge.repository.ConversationRepository;
import com.skillforge.service.AiChatService;
import com.skillforge.service.AiProvider;
import com.skillforge.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import com.skillforge.entity.ChatMessage;
import com.skillforge.entity.Conversation;
import com.skillforge.entity.MessageSender;
import com.skillforge.entity.User;

import com.skillforge.exception.ResourceNotFoundException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class AiChatServiceImpl implements AiChatService {

    private final ConversationRepository conversationRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserService userService;
    private final AiProvider aiProvider;
    private final AiChatMapper aiChatMapper;

    @Override
    public ChatResponseDto chat(ChatRequestDto request) {

        User currentUser = userService.getCurrentUserEntity();

        Conversation conversation;

        if (request.getConversationId() == null) {

            conversation = createConversation(
                    currentUser,
                    request.getMessage());

        } else {

            conversation = conversationRepository
                    .findByIdAndUser(
                            request.getConversationId(),
                            currentUser)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Conversation not found."));
        }

        ChatMessage userMessage = ChatMessage.builder()
                .conversation(conversation)
                .sender(MessageSender.USER)
                .message(request.getMessage())
                .build();

        chatMessageRepository.save(userMessage);

        String aiText = aiProvider.generateResponse(request.getMessage());

        ChatMessage aiMessage = ChatMessage.builder()
                .conversation(conversation)
                .sender(MessageSender.AI)
                .message(aiText)
                .build();

        chatMessageRepository.save(aiMessage);

        conversation.setUpdatedAt(LocalDateTime.now());

        conversationRepository.save(conversation);

        System.out.println("===== DEBUG =====");
        System.out.println("Conversation = " + conversation);
        System.out.println("Conversation ID = " + conversation.getId());
        System.out.println("Messages = " + conversation.getMessages());

        return ChatResponseDto.builder()
                .conversation(
                        aiChatMapper.toConversationDto(conversation))
                .userMessage(
                        aiChatMapper.toChatMessageDto(userMessage))
                .aiMessage(
                        aiChatMapper.toChatMessageDto(aiMessage))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ConversationDto getConversation(UUID conversationId) {

        User currentUser = userService.getCurrentUserEntity();

        Conversation conversation = conversationRepository
                .findByIdAndUser(conversationId, currentUser)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Conversation not found."));

        return aiChatMapper.toConversationDto(conversation);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConversationSummaryDto> getUserConversations() {

        User currentUser = userService.getCurrentUserEntity();

        List<Conversation> conversations = conversationRepository.findByUserOrderByUpdatedAtDesc(currentUser);

        return aiChatMapper.toConversationSummaryDtoList(conversations);
    }

    @Override
    public void deleteConversation(UUID conversationId) {

        User currentUser = userService.getCurrentUserEntity();

        Conversation conversation = conversationRepository
                .findByIdAndUser(conversationId, currentUser)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Conversation not found."));

        conversationRepository.delete(conversation);
    }

    private Conversation createConversation(User user, String firstMessage) {

        String title = firstMessage.length() > 50
                ? firstMessage.substring(0, 50)
                : firstMessage;

        Conversation conversation = Conversation.builder()
                .user(user)
                .title(title)
                .build();

        return conversationRepository.save(conversation);
    }
}