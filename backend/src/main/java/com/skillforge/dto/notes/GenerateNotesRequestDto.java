package com.skillforge.dto.notes;

import com.skillforge.entity.NoteType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GenerateNotesRequestDto {

    @NotBlank(message = "Title is required.")
    @Size(max = 100, message = "Title cannot exceed 100 characters.")
    private String title;

    @NotBlank(message = "Prompt is required.")
    @Size(max = 5000, message = "Prompt cannot exceed 5000 characters.")
    private String prompt;

    @NotNull(message = "Note type is required.")
    private NoteType noteType;

}
