package com.skillforge.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRequestDto {

    private UUID conversationId;

    @NotBlank
    private String message;

}