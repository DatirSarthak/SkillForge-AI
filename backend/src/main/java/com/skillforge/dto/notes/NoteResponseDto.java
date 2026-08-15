package com.skillforge.dto.notes;

import com.skillforge.entity.NoteType;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoteResponseDto {

    private UUID id;

    private String title;

    private String prompt;

    private String generatedContent;

    private NoteType noteType;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
