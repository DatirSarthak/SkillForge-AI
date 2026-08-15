package com.skillforge.repository;

import com.skillforge.entity.QuizAttempt;
import com.skillforge.entity.QuizAttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface QuizAttemptAnswerRepository
        extends JpaRepository<QuizAttemptAnswer, UUID> {

    List<QuizAttemptAnswer> findByAttemptOrderByQuestionQuestionOrderAsc(
            QuizAttempt attempt
    );

    void deleteByAttempt(QuizAttempt attempt);
}