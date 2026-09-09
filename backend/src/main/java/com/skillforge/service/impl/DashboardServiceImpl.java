package com.skillforge.service.impl;

import com.skillforge.dto.dashboard.*;
import com.skillforge.entity.Conversation;
import com.skillforge.entity.Note;
import com.skillforge.entity.Quiz;
import com.skillforge.entity.Roadmap;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.ConversationRepository;
import com.skillforge.repository.NoteRepository;
import com.skillforge.repository.QuizAttemptRepository;
import com.skillforge.repository.QuizRepository;
import com.skillforge.repository.ResumeReviewRepository;
import com.skillforge.repository.RoadmapRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

        private static final int RECENT_ACTIVITY_LIMIT = 8;

        private final UserRepository userRepository;
        private final ConversationRepository conversationRepository;
        private final NoteRepository noteRepository;
        private final QuizRepository quizRepository;
        private final QuizAttemptRepository quizAttemptRepository;
        private final ResumeReviewRepository resumeReviewRepository;
        private final RoadmapRepository roadmapRepository;

        @Override
        public DashboardResponseDto getDashboard(Authentication authentication) {

                User user = userRepository.findByEmail(authentication.getName())
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                UserSummaryDto userSummary = UserSummaryDto.builder()
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .email(user.getEmail())
                                .profileImageUrl(user.getProfileImageUrl())
                                .emailVerified(user.getEmailVerified())
                                .build();

                StatisticsDto statistics = StatisticsDto.builder()
                                .completedCourses(
                                                (int) roadmapRepository.countCompletedByUser(user))
                                .completedQuizzes(
                                                (int) quizAttemptRepository.countByUser(user))
                                .generatedNotes(
                                                (int) noteRepository.countByUser(user))
                                .aiChats(
                                                (int) conversationRepository.countByUser(user))
                                .build();

                List<QuickActionDto> quickActions = buildQuickActions();
                List<RecentActivityDto> recentActivities = buildRecentActivities(user);

                return DashboardResponseDto.builder()
                                .userSummary(userSummary)
                                .statistics(statistics)
                                .quickActions(quickActions)
                                .recentActivities(recentActivities)
                                .build();
        }

        private List<QuickActionDto> buildQuickActions() {
                List<QuickActionDto> quickActions = new ArrayList<>();

                quickActions.add(
                                QuickActionDto.builder()
                                                .title("AI Chat")
                                                .description("Chat with AI Assistant")
                                                .route("/ai-chat")
                                                .icon("MessageSquare")
                                                .build());

                quickActions.add(
                                QuickActionDto.builder()
                                                .title("AI Notes")
                                                .description("Generate Smart Notes")
                                                .route("/ai-notes")
                                                .icon("NotebookPen")
                                                .build());

                quickActions.add(
                                QuickActionDto.builder()
                                                .title("AI Quiz")
                                                .description("Generate Quiz")
                                                .route("/ai-quiz")
                                                .icon("ClipboardCheck")
                                                .build());

                quickActions.add(
                                QuickActionDto.builder()
                                                .title("Resume Review")
                                                .description("Review Resume")
                                                .route("/resume-review")
                                                .icon("FileText")
                                                .build());

                quickActions.add(
                                QuickActionDto.builder()
                                                .title("Roadmap")
                                                .description("Generate Learning Roadmap")
                                                .route("/ai-roadmap")
                                                .icon("Map")
                                                .build());

                return quickActions;
        }

        private List<RecentActivityDto> buildRecentActivities(User user) {
                PageRequest limit = PageRequest.of(0, RECENT_ACTIVITY_LIMIT);

                List<RecentActivityDto> activities = new ArrayList<>();

                List<Conversation> conversations = conversationRepository.findByUserOrderByUpdatedAtDesc(user, limit);

                conversations.forEach(conversation -> activities.add(activity(
                                "AI Chat: " + conversation.getTitle(),
                                "Conversation updated with SkillForge AI.",
                                "AI Chat",
                                conversation.getUpdatedAt())));

                List<Note> notes = noteRepository.findByUserOrderByUpdatedAtDesc(user);

                notes.stream()
                                .limit(RECENT_ACTIVITY_LIMIT)
                                .forEach(note -> activities.add(activity(
                                                "Note: " + note.getTitle(),
                                                "AI-generated note is available in your notes.",
                                                "AI Notes",
                                                note.getUpdatedAt())));

                List<Quiz> quizzes = quizRepository.findByUserOrderByCreatedAtDesc(user, limit);

                quizzes.forEach(quiz -> activities.add(activity(
                                "Quiz: " + quiz.getTitle(),
                                "AI quiz generated for " + quiz.getTopic() + ".",
                                "AI Quiz",
                                quiz.getCreatedAt())));

                resumeReviewRepository
                                .findByUserOrderByCreatedAtDesc(user, limit)
                                .getContent()
                                .forEach(review -> activities.add(activity(
                                                "Resume Review: " + review.getFileName(),
                                                "Resume review completed with ATS analysis.",
                                                "Resume Review",
                                                review.getCreatedAt())));

                List<Roadmap> roadmaps = roadmapRepository.findByUserOrderByCreatedAtDesc(user, limit);

                roadmaps.forEach(roadmap -> activities.add(activity(
                                "Roadmap: " + roadmap.getTitle(),
                                "Learning roadmap created for " + roadmap.getTopic() + ".",
                                "Roadmap",
                                roadmap.getCreatedAt())));

                return activities.stream()
                                .filter(activity -> activity.getCreatedAt() != null)
                                .sorted(Comparator.comparing(
                                                RecentActivityDto::getCreatedAt,
                                                Comparator.reverseOrder()))
                                .limit(RECENT_ACTIVITY_LIMIT)
                                .toList();
        }

        private RecentActivityDto activity(
                        String title,
                        String description,
                        String activityType,
                        LocalDateTime createdAt) {
                return RecentActivityDto.builder()
                                .title(title)
                                .description(description)
                                .activityType(activityType)
                                .createdAt(createdAt != null ? createdAt.toString() : null)
                                .build();
        }
}
