package com.skillforge.dto.ai;

import com.skillforge.entity.MessageSender;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDto {

    private UUID id;

    private MessageSender sender;

    private String message;

    private LocalDateTime createdAt;

}
