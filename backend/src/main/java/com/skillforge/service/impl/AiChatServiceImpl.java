package com.skillforge.service.impl;

import com.skillforge.dto.ai.ChatRequestDto;
import com.skillforge.dto.ai.ChatResponseDto;
import com.skillforge.dto.ai.ConversationDto;
import com.skillforge.dto.ai.ConversationSummaryDto;
import com.skillforge.entity.ChatMessage;
import com.skillforge.entity.Conversation;
import com.skillforge.entity.MessageSender;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.mapper.AiChatMapper;
import com.skillforge.repository.ChatMessageRepository;
import com.skillforge.repository.ConversationRepository;
import com.skillforge.service.AiChatService;
import com.skillforge.service.AiProvider;
import com.skillforge.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.function.Consumer;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
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

        conversation.getMessages().add(userMessage);

        long start = System.currentTimeMillis();

        String aiText = aiProvider.generateResponse(
                request.getMessage());

        long end = System.currentTimeMillis();

        log.info(
                "AI response generated in {} ms for conversation {}",
                (end - start),
                conversation.getId());

        ChatMessage aiMessage = ChatMessage.builder()
                .conversation(conversation)
                .sender(MessageSender.AI)
                .message(aiText)
                .build();

        chatMessageRepository.save(aiMessage);

        conversation.getMessages().add(aiMessage);

        conversation.setUpdatedAt(LocalDateTime.now());

        conversationRepository.save(conversation);

        conversation = conversationRepository
                .findById(conversation.getId())
                .orElseThrow();

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
    public ChatResponseDto streamChat(
            ChatRequestDto request,
            Consumer<String> onChunk) {

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

        /*
         * Save user message before starting AI generation.
         */
        ChatMessage userMessage = ChatMessage.builder()
                .conversation(conversation)
                .sender(MessageSender.USER)
                .message(request.getMessage())
                .build();

        chatMessageRepository.save(userMessage);

        conversation.getMessages().add(userMessage);

        /*
         * Collect the complete AI response while
         * simultaneously forwarding every chunk
         * to the controller.
         */
        StringBuilder aiResponseBuilder = new StringBuilder();

        long start = System.currentTimeMillis();

        aiProvider.streamResponse(
                request.getMessage(),
                chunk -> {

                    if (chunk == null || chunk.isEmpty()) {
                        return;
                    }

                    aiResponseBuilder.append(chunk);

                    onChunk.accept(chunk);
                });

        long end = System.currentTimeMillis();

        String aiText = aiResponseBuilder.toString();

        log.info(
                "AI streaming response completed in {} ms for conversation {}",
                (end - start),
                conversation.getId());

        /*
         * Save ONE AI message after the complete
         * streaming response has been received.
         */
        ChatMessage aiMessage = ChatMessage.builder()
                .conversation(conversation)
                .sender(MessageSender.AI)
                .message(aiText)
                .build();

        chatMessageRepository.save(aiMessage);

        conversation.getMessages().add(aiMessage);

        conversation.setUpdatedAt(LocalDateTime.now());

        conversationRepository.save(conversation);

        /*
         * Reload the conversation so that the final
         * response contains the authoritative database state.
         */
        conversation = conversationRepository
                .findById(conversation.getId())
                .orElseThrow();

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

        List<Conversation> conversations =
                conversationRepository.findByUserOrderByUpdatedAtDesc(
                        currentUser);

        return aiChatMapper.toConversationSummaryDtoList(
                conversations);
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

    @Override
    public void renameConversation(
            UUID conversationId,
            String title) {

        User currentUser = userService.getCurrentUserEntity();

        Conversation conversation = conversationRepository
                .findByIdAndUser(conversationId, currentUser)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Conversation not found."));

        conversation.setTitle(title.trim());

        conversation.setUpdatedAt(LocalDateTime.now());

        conversationRepository.save(conversation);
    }

    private Conversation createConversation(
            User user,
            String firstMessage) {

        String title = firstMessage.trim();

        if (title.length() > 50) {
            title = title.substring(0, 50).trim();
        }

        Conversation conversation = Conversation.builder()
                .user(user)
                .title(title)
                .build();

        return conversationRepository.save(conversation);
    }
}