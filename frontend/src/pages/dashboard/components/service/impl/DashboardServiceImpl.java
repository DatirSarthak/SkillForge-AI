package com.skillforge.service.impl;

import com.skillforge.dto.dashboard.*;
import com.skillforge.entity.User;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;

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
                .completedCourses(0)
                .completedQuizzes(0)
                .generatedNotes(0)
                .aiChats(0)
                .build();

        List<QuickActionDto> quickActions = new ArrayList<>();

        quickActions.add(
                QuickActionDto.builder()
                        .title("AI Chat")
                        .description("Chat with AI Assistant")
                        .route("/ai-chat")
                        .icon("MessageSquare")
                        .build()
        );

        quickActions.add(
                QuickActionDto.builder()
                        .title("AI Notes")
                        .description("Generate Smart Notes")
                        .route("/ai-notes")
                        .icon("NotebookPen")
                        .build()
        );

        quickActions.add(
                QuickActionDto.builder()
                        .title("AI Quiz")
                        .description("Generate Quiz")
                        .route("/ai-quiz")
                        .icon("ClipboardCheck")
                        .build()
        );

        quickActions.add(
                QuickActionDto.builder()
                        .title("Resume Review")
                        .description("Review Resume")
                        .route("/resume-review")
                        .icon("FileText")
                        .build()
        );

        quickActions.add(
                QuickActionDto.builder()
                        .title("Roadmap")
                        .description("Generate Learning Roadmap")
                        .route("/ai-roadmap")
                        .icon("Map")
                        .build()
        );

        List<RecentActivityDto> recentActivities = new ArrayList<>();

        return DashboardResponseDto.builder()
                .userSummary(userSummary)
                .statistics(statistics)
                .quickActions(quickActions)
                .recentActivities(recentActivities)
                .build();
    }
}