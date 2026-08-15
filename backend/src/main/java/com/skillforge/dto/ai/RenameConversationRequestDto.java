package com.skillforge.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RenameConversationRequestDto {

    @NotBlank
    private String title;

}