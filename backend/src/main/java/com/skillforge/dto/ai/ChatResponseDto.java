package com.skillforge.dto.ai;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatResponseDto {

    private ConversationDto conversation;

    private ChatMessageDto userMessage;

    private ChatMessageDto aiMessage;

}
