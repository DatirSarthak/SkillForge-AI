package com.skillforge.mapper;

import com.skillforge.dto.ai.ChatMessageDto;
import com.skillforge.dto.ai.ConversationDto;
import com.skillforge.dto.ai.ConversationSummaryDto;
import com.skillforge.entity.ChatMessage;
import com.skillforge.entity.Conversation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AiChatMapper {

    ChatMessageDto toChatMessageDto(ChatMessage chatMessage);

    List<ChatMessageDto> toChatMessageDtoList(List<ChatMessage> messages);

    @Mapping(target = "messages", source = "messages")
    ConversationDto toConversationDto(Conversation conversation);

    List<ConversationSummaryDto> toConversationSummaryDtoList(
            List<Conversation> conversations
    );
}
