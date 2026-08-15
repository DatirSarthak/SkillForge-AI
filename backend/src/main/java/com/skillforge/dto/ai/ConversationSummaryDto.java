package com.skillforge.dto.ai;

import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationSummaryDto {

    private UUID id;

    private String title;

    private LocalDateTime updatedAt;

}
