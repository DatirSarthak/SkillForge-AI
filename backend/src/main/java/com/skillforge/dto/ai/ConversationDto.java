package com.skillforge.dto.ai;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationDto {

    private UUID id;

    private String title;

    private List<ChatMessageDto> messages;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}