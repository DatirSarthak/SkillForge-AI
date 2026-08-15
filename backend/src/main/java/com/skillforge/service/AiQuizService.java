package com.skillforge.service;

import com.skillforge.dto.quiz.QuizAttemptRequestDto;
import com.skillforge.dto.quiz.QuizGenerateRequestDto;
import com.skillforge.dto.quiz.QuizResponseDto;
import com.skillforge.dto.quiz.QuizResultDto;
import com.skillforge.dto.quiz.QuizSummaryDto;

import java.util.List;
import java.util.UUID;

public interface AiQuizService {

    QuizResponseDto generateQuiz(
            QuizGenerateRequestDto request
    );

    List<QuizSummaryDto> getUserQuizzes();

    QuizResponseDto getQuiz(UUID quizId);

    QuizResultDto submitQuiz(
            UUID quizId,
            QuizAttemptRequestDto request
    );

    QuizResultDto getAttempt(UUID attemptId);

    void deleteQuiz(UUID quizId);
}