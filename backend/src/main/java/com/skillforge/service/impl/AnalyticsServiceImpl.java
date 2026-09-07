package com.skillforge.service.impl;

import com.skillforge.dto.analytics.ActivityTrendDto;
import com.skillforge.dto.analytics.AnalyticsResponseDto;
import com.skillforge.dto.analytics.ChatAnalyticsDto;
import com.skillforge.dto.analytics.NotesAnalyticsDto;
import com.skillforge.dto.analytics.QuizAnalyticsDto;
import com.skillforge.dto.analytics.ResumeAnalyticsDto;
import com.skillforge.dto.analytics.RoadmapAnalyticsDto;
import com.skillforge.entity.MessageSender;
import com.skillforge.entity.NoteType;
import com.skillforge.entity.QuizDifficulty;
import com.skillforge.entity.User;
import com.skillforge.repository.AnalyticsRepository;
import com.skillforge.repository.ChatMessageRepository;
import com.skillforge.repository.ConversationRepository;
import com.skillforge.repository.NoteRepository;
import com.skillforge.repository.QuizAttemptRepository;
import com.skillforge.repository.QuizRepository;
import com.skillforge.repository.ResumeReviewRepository;
import com.skillforge.repository.RoadmapRepository;
import com.skillforge.repository.RoadmapStepProgressRepository;
import com.skillforge.service.AnalyticsService;
import com.skillforge.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnalyticsServiceImpl implements AnalyticsService {

    private static final int TREND_DAYS = 30;

    private final UserService userService;

    private final ConversationRepository conversationRepository;
    private final ChatMessageRepository chatMessageRepository;

    private final NoteRepository noteRepository;

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    private final ResumeReviewRepository resumeReviewRepository;

    private final RoadmapRepository roadmapRepository;
    private final RoadmapStepProgressRepository roadmapStepProgressRepository;

    private final AnalyticsRepository analyticsRepository;

    @Override
    public AnalyticsResponseDto getAnalytics() {

        User currentUser = userService.getCurrentUserEntity();

        ChatAnalyticsDto chatAnalytics = buildChatAnalytics(currentUser);

        NotesAnalyticsDto notesAnalytics = buildNotesAnalytics(currentUser);

        QuizAnalyticsDto quizAnalytics = buildQuizAnalytics(currentUser);

        ResumeAnalyticsDto resumeAnalytics =
                buildResumeAnalytics(currentUser);

        RoadmapAnalyticsDto roadmapAnalytics =
                buildRoadmapAnalytics(currentUser);

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(TREND_DAYS - 1);

        List<ActivityTrendDto> activityTrend =
                analyticsRepository.findActivityTrend(
                        currentUser,
                        startDate,
                        endDate
                );

        return AnalyticsResponseDto.builder()
                .chat(chatAnalytics)
                .notes(notesAnalytics)
                .quiz(quizAnalytics)
                .resume(resumeAnalytics)
                .roadmap(roadmapAnalytics)
                .activityTrend(activityTrend)
                .build();
    }

    private ChatAnalyticsDto buildChatAnalytics(User user) {

        long totalConversations =
                conversationRepository.countByUser(user);

        long totalMessages =
                chatMessageRepository.countByConversation_User(user);

        long userMessages =
                chatMessageRepository.countByConversation_UserAndSender(
                        user,
                        MessageSender.USER
                );

        long aiMessages =
                chatMessageRepository.countByConversation_UserAndSender(
                        user,
                        MessageSender.AI
                );

        return ChatAnalyticsDto.builder()
                .totalConversations(totalConversations)
                .totalMessages(totalMessages)
                .userMessages(userMessages)
                .aiMessages(aiMessages)
                .build();
    }

    private NotesAnalyticsDto buildNotesAnalytics(User user) {

        long totalNotes = noteRepository.countByUser(user);

        long detailedNotes =
                noteRepository.countByUserAndNoteType(
                        user,
                        NoteType.DETAILED
                );

        long summaryNotes =
                noteRepository.countByUserAndNoteType(
                        user,
                        NoteType.SUMMARY
                );

        long bulletPointsNotes =
                noteRepository.countByUserAndNoteType(
                        user,
                        NoteType.BULLET_POINTS
                );

        long interviewNotes =
                noteRepository.countByUserAndNoteType(
                        user,
                        NoteType.INTERVIEW
                );

        long revisionNotes =
                noteRepository.countByUserAndNoteType(
                        user,
                        NoteType.REVISION
                );

        return NotesAnalyticsDto.builder()
                .totalNotes(totalNotes)
                .detailedNotes(detailedNotes)
                .summaryNotes(summaryNotes)
                .bulletPointsNotes(bulletPointsNotes)
                .interviewNotes(interviewNotes)
                .revisionNotes(revisionNotes)
                .build();
    }

    private QuizAnalyticsDto buildQuizAnalytics(User user) {

        long totalQuizzes =
                quizRepository.countByUser(user);

        long totalAttempts =
                quizAttemptRepository.countByUser(user);

        BigDecimal averageScore =
                quizAttemptRepository.findAveragePercentageByUser(user);

        BigDecimal bestScore =
                quizAttemptRepository.findBestPercentageByUser(user);

        long easyQuizzes =
                quizRepository.countByUserAndDifficulty(
                        user,
                        QuizDifficulty.EASY
                );

        long mediumQuizzes =
                quizRepository.countByUserAndDifficulty(
                        user,
                        QuizDifficulty.MEDIUM
                );

        long hardQuizzes =
                quizRepository.countByUserAndDifficulty(
                        user,
                        QuizDifficulty.HARD
                );

        return QuizAnalyticsDto.builder()
                .totalQuizzes(totalQuizzes)
                .totalAttempts(totalAttempts)
                .averageScore(roundScore(averageScore))
                .bestScore(roundScore(bestScore))
                .easyQuizzes(easyQuizzes)
                .mediumQuizzes(mediumQuizzes)
                .hardQuizzes(hardQuizzes)
                .build();
    }

    private ResumeAnalyticsDto buildResumeAnalytics(User user) {

        long totalReviews =
                resumeReviewRepository.countByUser(user);

        BigDecimal averageAtsScore =
                resumeReviewRepository.findAverageAtsScoreByUser(user);

        BigDecimal bestAtsScore =
                resumeReviewRepository.findBestAtsScoreByUser(user);

        return ResumeAnalyticsDto.builder()
                .totalReviews(totalReviews)
                .averageAtsScore(roundScore(averageAtsScore))
                .bestAtsScore(roundScore(bestAtsScore))
                .build();
    }

    private RoadmapAnalyticsDto buildRoadmapAnalytics(User user) {

        long totalRoadmaps =
                roadmapRepository.countByUser(user);

        long totalSteps =
                roadmapStepProgressRepository.countByUser(user);

        long completedSteps =
                roadmapStepProgressRepository.countCompletedByUser(user);

        BigDecimal progressPercentage = BigDecimal.ZERO;

        if (totalSteps > 0) {
            progressPercentage = BigDecimal.valueOf(completedSteps)
                    .multiply(BigDecimal.valueOf(100))
                    .divide(
                            BigDecimal.valueOf(totalSteps),
                            2,
                            RoundingMode.HALF_UP
                    );
        }

        return RoadmapAnalyticsDto.builder()
                .totalRoadmaps(totalRoadmaps)
                .totalSteps(totalSteps)
                .completedSteps(completedSteps)
                .progressPercentage(progressPercentage)
                .lastCompletedAt(
                        roadmapStepProgressRepository
                                .findLastCompletedAtByUser(user)
                )
                .build();
    }

    private BigDecimal roundScore(BigDecimal value) {

        if (value == null) {
            return BigDecimal.ZERO;
        }

        return value.setScale(
                2,
                RoundingMode.HALF_UP
        );
    }
}