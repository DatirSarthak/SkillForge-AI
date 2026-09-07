package com.skillforge.repository;

import com.skillforge.dto.analytics.ActivityTrendDto;
import com.skillforge.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AnalyticsRepositoryImpl implements AnalyticsRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<ActivityTrendDto> findActivityTrend(
            User user,
            LocalDate startDate,
            LocalDate endDate
    ) {

        String sql = """
                SELECT
                    activity_date,
                    SUM(chat_messages) AS chat_messages,
                    SUM(notes) AS notes,
                    SUM(quiz_attempts) AS quiz_attempts,
                    SUM(resume_reviews) AS resume_reviews,
                    SUM(roadmap_completions) AS roadmap_completions
                FROM (
                    SELECT
                        DATE(cm.created_at) AS activity_date,
                        COUNT(*) AS chat_messages,
                        0 AS notes,
                        0 AS quiz_attempts,
                        0 AS resume_reviews,
                        0 AS roadmap_completions
                    FROM chat_messages cm
                    JOIN conversations c
                        ON cm.conversation_id = c.id
                    WHERE c.user_id = :userId
                      AND cm.created_at >= :startDate
                      AND cm.created_at < :endDate
                    GROUP BY DATE(cm.created_at)

                    UNION ALL

                    SELECT
                        DATE(n.created_at) AS activity_date,
                        0 AS chat_messages,
                        COUNT(*) AS notes,
                        0 AS quiz_attempts,
                        0 AS resume_reviews,
                        0 AS roadmap_completions
                    FROM notes n
                    WHERE n.user_id = :userId
                      AND n.created_at >= :startDate
                      AND n.created_at < :endDate
                    GROUP BY DATE(n.created_at)

                    UNION ALL

                    SELECT
                        DATE(qa.completed_at) AS activity_date,
                        0 AS chat_messages,
                        0 AS notes,
                        COUNT(*) AS quiz_attempts,
                        0 AS resume_reviews,
                        0 AS roadmap_completions
                    FROM quiz_attempts qa
                    WHERE qa.user_id = :userId
                      AND qa.completed_at >= :startDate
                      AND qa.completed_at < :endDate
                    GROUP BY DATE(qa.completed_at)

                    UNION ALL

                    SELECT
                        DATE(rr.created_at) AS activity_date,
                        0 AS chat_messages,
                        0 AS notes,
                        0 AS quiz_attempts,
                        COUNT(*) AS resume_reviews,
                        0 AS roadmap_completions
                    FROM resume_reviews rr
                    WHERE rr.user_id = :userId
                      AND rr.created_at >= :startDate
                      AND rr.created_at < :endDate
                    GROUP BY DATE(rr.created_at)

                    UNION ALL

                    SELECT
                        DATE(rsp.completed_at) AS activity_date,
                        0 AS chat_messages,
                        0 AS notes,
                        0 AS quiz_attempts,
                        0 AS resume_reviews,
                        COUNT(*) AS roadmap_completions
                    FROM roadmap_step_progress rsp
                    JOIN roadmap_steps rs
                        ON rsp.roadmap_step_id = rs.id
                    JOIN roadmaps r
                        ON rs.roadmap_id = r.id
                    WHERE r.user_id = :userId
                      AND rsp.completed = true
                      AND rsp.completed_at >= :startDate
                      AND rsp.completed_at < :endDate
                    GROUP BY DATE(rsp.completed_at)
                ) activity
                GROUP BY activity_date
                ORDER BY activity_date ASC
                """;

        @SuppressWarnings("unchecked")
        List<Object[]> results = entityManager
                .createNativeQuery(sql)
                .setParameter("userId", user.getId())
                .setParameter(
                        "startDate",
                        startDate.atStartOfDay()
                )
                .setParameter(
                        "endDate",
                        endDate.plusDays(1).atStartOfDay()
                )
                .getResultList();

        List<ActivityTrendDto> trend = new ArrayList<>();

        for (Object[] row : results) {

            LocalDate date = ((Date) row[0]).toLocalDate();

            long chatMessages = ((Number) row[1]).longValue();
            long notes = ((Number) row[2]).longValue();
            long quizAttempts = ((Number) row[3]).longValue();
            long resumeReviews = ((Number) row[4]).longValue();
            long roadmapCompletions = ((Number) row[5]).longValue();

            long totalActivity =
                    chatMessages
                    + notes
                    + quizAttempts
                    + resumeReviews
                    + roadmapCompletions;

            trend.add(
                    ActivityTrendDto.builder()
                            .date(date)
                            .chatMessages(chatMessages)
                            .notes(notes)
                            .quizAttempts(quizAttempts)
                            .resumeReviews(resumeReviews)
                            .roadmapCompletions(roadmapCompletions)
                            .totalActivity(totalActivity)
                            .build()
            );
        }

        return trend;
    }
}
