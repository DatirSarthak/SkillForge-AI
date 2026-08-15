package com.skillforge.dto.quiz;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class QuizAttemptAnswerDto {

    private UUID questionId;
    private Integer questionOrder;
    private String questionText;
    private String selectedOption;
    private String correctOption;
    private boolean correct;
    private String explanation;
}