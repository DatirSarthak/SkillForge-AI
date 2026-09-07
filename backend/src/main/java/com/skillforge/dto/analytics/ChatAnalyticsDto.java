package com.skillforge.dto.analytics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatAnalyticsDto {

    private long totalConversations;

    private long totalMessages;

    private long userMessages;

    private long aiMessages;
}
