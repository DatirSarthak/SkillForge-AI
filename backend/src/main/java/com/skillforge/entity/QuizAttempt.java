package com.skillforge.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quiz_attempts", indexes = {
                @Index(name = "idx_quiz_attempt_quiz_id", columnList = "quiz_id"),
                @Index(name = "idx_quiz_attempt_user_id", columnList = "user_id"),
                @Index(name = "idx_quiz_attempt_completed_at", columnList = "completed_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttempt {

        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "quiz_id", nullable = false, foreignKey = @ForeignKey(name = "fk_quiz_attempt_quiz"))
        private Quiz quiz;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "fk_quiz_attempt_user"))
        private User user;

        @Column(nullable = false)
        private Integer score;

        @Column(name = "total_questions", nullable = false)
        private Integer totalQuestions;

        @Column(nullable = false)
        private Double percentage;

        @Column(name = "completed_at", nullable = false)
        private LocalDateTime completedAt;

        @PrePersist
        protected void onCreate() {
                completedAt = LocalDateTime.now();
        }

        @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
        @Builder.Default
        private List<QuizAttemptAnswer> answers = new ArrayList<>();

        public void addAnswer(QuizAttemptAnswer answer) {
                answers.add(answer);
                answer.setAttempt(this);
        }
}