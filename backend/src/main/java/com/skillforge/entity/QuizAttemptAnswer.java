package com.skillforge.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(
        name = "quiz_attempt_answers",
        indexes = {
                @Index(
                        name = "idx_quiz_attempt_answer_attempt_id",
                        columnList = "attempt_id"
                ),
                @Index(
                        name = "idx_quiz_attempt_answer_question_id",
                        columnList = "question_id"
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttemptAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "attempt_id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "fk_quiz_attempt_answer_attempt"
            )
    )
    private QuizAttempt attempt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "question_id",
            nullable = false,
            foreignKey = @ForeignKey(
                    name = "fk_quiz_attempt_answer_question"
            )
    )
    private QuizQuestion question;

    @Column(
            name = "selected_option",
            nullable = false,
            length = 1
    )
    private String selectedOption;

    @Column(
            name = "correct_option",
            nullable = false,
            length = 1
    )
    private String correctOption;

    @Column(
            name = "is_correct",
            nullable = false
    )
    private Boolean correct;
}