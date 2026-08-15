package com.skillforge.controller;

import com.skillforge.constants.ApiMessages;
import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.ai.ChatRequestDto;
import com.skillforge.dto.ai.ChatResponseDto;
import com.skillforge.dto.ai.ConversationDto;
import com.skillforge.dto.ai.ConversationSummaryDto;
import com.skillforge.service.AiChatService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.skillforge.dto.ai.RenameConversationRequestDto;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiChatController {

        private final AiChatService aiChatService;

        @PostMapping("/chat")
        public ApiResponse<ChatResponseDto> chat(
                        @Valid @RequestBody ChatRequestDto request,
                        HttpServletRequest httpRequest) {

                return ResponseUtil.success(
                                ApiMessages.AI_RESPONSE_GENERATED,
                                aiChatService.chat(request),
                                httpRequest.getRequestURI());
        }

        @GetMapping("/conversations")
        public ApiResponse<List<ConversationSummaryDto>> getConversations(
                        HttpServletRequest request) {

                return ResponseUtil.success(
                                "OK",
                                aiChatService.getUserConversations(),
                                request.getRequestURI());
        }

        @GetMapping("/conversations/{conversationId}")
        public ApiResponse<ConversationDto> getConversation(
                        @PathVariable UUID conversationId,
                        HttpServletRequest request) {

                return ResponseUtil.success(
                                ApiMessages.CONVERSATION_FETCHED,
                                aiChatService.getConversation(conversationId),
                                request.getRequestURI());
        }

        @DeleteMapping("/conversations/{conversationId}")
        public ApiResponse<Void> deleteConversation(
                        @PathVariable UUID conversationId,
                        HttpServletRequest request) {

                aiChatService.deleteConversation(conversationId);

                return ResponseUtil.success(
                                ApiMessages.CONVERSATION_DELETED,
                                request.getRequestURI());
        }

        @PutMapping("/conversations/{conversationId}/rename")
        public ApiResponse<Void> renameConversation(
                        @PathVariable UUID conversationId,
                        @Valid @RequestBody RenameConversationRequestDto request,
                        HttpServletRequest httpRequest) {

                aiChatService.renameConversation(
                                conversationId,
                                request.getTitle());

                return ResponseUtil.success(
                                "Conversation renamed successfully.",
                                httpRequest.getRequestURI());

        }

}