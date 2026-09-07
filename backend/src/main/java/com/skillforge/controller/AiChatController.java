package com.skillforge.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillforge.constants.ApiMessages;
import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.ai.ChatRequestDto;
import com.skillforge.dto.ai.ChatResponseDto;
import com.skillforge.dto.ai.ConversationDto;
import com.skillforge.dto.ai.ConversationSummaryDto;
import com.skillforge.dto.ai.RenameConversationRequestDto;
import com.skillforge.service.AiChatService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Slf4j
public class AiChatController {

        private final AiChatService aiChatService;
        private final ObjectMapper objectMapper;

        @PostMapping("/chat")
        public ApiResponse<ChatResponseDto> chat(
                        @Valid @RequestBody ChatRequestDto request,
                        HttpServletRequest httpRequest) {

                return ResponseUtil.success(
                                ApiMessages.AI_RESPONSE_GENERATED,
                                aiChatService.chat(request),
                                httpRequest.getRequestURI());
        }

        @PostMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
        public StreamingResponseBody streamChat(
                        @Valid @RequestBody ChatRequestDto request) {

                return outputStream -> {

                        try {

                                ChatResponseDto response = aiChatService.streamChat(
                                                request,
                                                chunk -> {

                                                        try {

                                                                String data = objectMapper.writeValueAsString(
                                                                                new StreamChunk(chunk));

                                                                outputStream.write(
                                                                                ("event: chunk\n" +
                                                                                                "data: " + data
                                                                                                + "\n\n")
                                                                                                .getBytes(StandardCharsets.UTF_8));

                                                                outputStream.flush();

                                                        } catch (Exception ex) {

                                                                throw new RuntimeException(
                                                                                "Failed to send AI stream chunk.",
                                                                                ex);
                                                        }
                                                });

                                /*
                                 * Send final server-authoritative response.
                                 */
                                String doneData = objectMapper.writeValueAsString(response);

                                outputStream.write(
                                                ("event: done\n" +
                                                                "data: " + doneData + "\n\n")
                                                                .getBytes(StandardCharsets.UTF_8));

                                outputStream.flush();

                        } catch (Exception ex) {
                                log.error("AI streaming controller failed.", ex);
                                try {

                                        String errorData = objectMapper.writeValueAsString(
                                                        new StreamError(
                                                                        "AI response streaming failed."));

                                        outputStream.write(
                                                        ("event: error\n" +
                                                                        "data: " + errorData + "\n\n")
                                                                        .getBytes(StandardCharsets.UTF_8));

                                        outputStream.flush();

                                } catch (Exception ignored) {
                                        // Client may have disconnected.
                                }
                        }
                };
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

        private record StreamChunk(String text) {
        }

        private record StreamError(String message) {
        }
}