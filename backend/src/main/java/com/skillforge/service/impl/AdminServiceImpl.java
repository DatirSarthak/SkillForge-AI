package com.skillforge.service.impl;

import com.skillforge.dto.admin.AdminDashboardResponseDto;
import com.skillforge.dto.admin.AdminUserDetailsResponseDto;
import com.skillforge.dto.admin.AdminUserFilterRequestDto;
import com.skillforge.dto.admin.AdminUserResponseDto;
import com.skillforge.dto.admin.AdminUserStatusRequestDto;
import com.skillforge.entity.AccountStatus;
import com.skillforge.entity.Role;
import com.skillforge.entity.User;
import com.skillforge.exception.ConflictException;
import com.skillforge.exception.ResourceNotFoundException;
import com.skillforge.mapper.AdminMapper;
import com.skillforge.repository.ChatMessageRepository;
import com.skillforge.repository.ConversationRepository;
import com.skillforge.repository.NoteRepository;
import com.skillforge.repository.NotificationRepository;
import com.skillforge.repository.QuizAttemptRepository;
import com.skillforge.repository.QuizRepository;
import com.skillforge.repository.ResumeReviewRepository;
import com.skillforge.repository.RoadmapRepository;
import com.skillforge.repository.RoadmapStepProgressRepository;
import com.skillforge.repository.UserRepository;
import com.skillforge.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final NoteRepository noteRepository;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final ResumeReviewRepository resumeReviewRepository;
    private final RoadmapRepository roadmapRepository;
    private final RoadmapStepProgressRepository roadmapStepProgressRepository;
    private final NotificationRepository notificationRepository;
    private final AdminMapper adminMapper;

    private static final int RECENT_USER_LIMIT = 5;

    @Override
    public AdminDashboardResponseDto getDashboard() {
        return AdminDashboardResponseDto.builder()
                .totalUsers(userRepository.count())
                .activeUsers(userRepository.countByAccountStatus(AccountStatus.ACTIVE))
                .inactiveUsers(userRepository.countByAccountStatus(AccountStatus.INACTIVE))
                .lockedUsers(userRepository.countByAccountStatus(AccountStatus.LOCKED))
                .verifiedUsers(userRepository.countByEmailVerifiedTrue())
                .unverifiedUsers(userRepository.countByEmailVerifiedFalse())
                .totalConversations(conversationRepository.count())
                .totalMessages(chatMessageRepository.count())
                .totalNotes(noteRepository.count())
                .totalQuizzes(quizRepository.count())
                .totalQuizAttempts(quizAttemptRepository.count())
                .totalResumeReviews(resumeReviewRepository.count())
                .totalRoadmaps(roadmapRepository.count())
                .totalRoadmapSteps(roadmapStepProgressRepository.count())
                .completedRoadmapSteps(roadmapStepProgressRepository.countCompletedByAllUsers())
                .recentUsers(userRepository
                        .findAll(PageRequest.of(
                                0,
                                RECENT_USER_LIMIT,
                                Sort.by(Sort.Direction.DESC, "createdAt")
                        ))
                        .map(adminMapper::toUserResponseDto)
                        .getContent())
                .build();
    }

    @Override
    public Page<AdminUserResponseDto> getUsers(AdminUserFilterRequestDto request) {
        Pageable pageable = buildPageable(request);
        Specification<User> specification = buildSpecification(request);

        return userRepository.findAll(specification, pageable)
                .map(adminMapper::toUserResponseDto);
    }

    @Override
    public AdminUserDetailsResponseDto getUserDetails(UUID userId) {
        User user = findUser(userId);
        return buildUserDetails(user);
    }

    @Override
    @Transactional
    public AdminUserDetailsResponseDto updateUserStatus(
            UUID userId,
            AdminUserStatusRequestDto request
    ) {
        User user = findUser(userId);
        User currentUser = getAuthenticatedUser();

        if (currentUser.getId().equals(userId)
                && request.getAccountStatus() != AccountStatus.ACTIVE) {
            throw new ConflictException(
                    "An administrator cannot deactivate or lock their own account.",
                    "ADMIN-001"
            );
        }

        user.setAccountStatus(request.getAccountStatus());
        User savedUser = userRepository.save(user);

        return buildUserDetails(savedUser);
    }

    private AdminUserDetailsResponseDto buildUserDetails(User user) {
        return AdminUserDetailsResponseDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .accountStatus(user.getAccountStatus())
                .emailVerified(user.getEmailVerified())
                .profileImageUrl(user.getProfileImageUrl())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .conversations(conversationRepository.countByUser(user))
                .messages(chatMessageRepository.countByConversation_User(user))
                .notes(noteRepository.countByUser(user))
                .quizzes(quizRepository.countByUser(user))
                .quizAttempts(quizAttemptRepository.countByUser(user))
                .resumeReviews(resumeReviewRepository.countByUser(user))
                .roadmaps(roadmapRepository.countByUser(user))
                .roadmapSteps(roadmapStepProgressRepository.countByUser(user))
                .completedRoadmapSteps(roadmapStepProgressRepository.countCompletedByUser(user))
                .notifications(notificationRepository.countByUser(user))
                .build();
    }

    private User findUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found."));
    }

    private Pageable buildPageable(AdminUserFilterRequestDto request) {
        String sortBy = normalizeSortField(request.getSortBy());
        Sort.Direction direction = "asc".equalsIgnoreCase(request.getDirection())
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        return PageRequest.of(
                request.getPage(),
                request.getSize(),
                Sort.by(direction, sortBy)
        );
    }

    private String normalizeSortField(String sortBy) {
        if (sortBy == null || sortBy.isBlank()) {
            return "createdAt";
        }

        return switch (sortBy) {
            case "firstName", "lastName", "email", "role", "accountStatus", "createdAt", "updatedAt" -> sortBy;
            default -> "createdAt";
        };
    }

    private Specification<User> buildSpecification(AdminUserFilterRequestDto request) {
        Specification<User> specification = Specification.where(null);

        if (request.getSearch() != null && !request.getSearch().isBlank()) {
            String search = "%" + request.getSearch().trim().toLowerCase(Locale.ROOT) + "%";
            specification = specification.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("firstName")), search),
                    cb.like(cb.lower(root.get("lastName")), search),
                    cb.like(cb.lower(root.get("email")), search)
            ));
        }

        if (request.getRole() != null) {
            specification = specification.and((root, query, cb) ->
                    cb.equal(root.get("role"), request.getRole()));
        }

        if (request.getStatus() != null) {
            specification = specification.and((root, query, cb) ->
                    cb.equal(root.get("accountStatus"), request.getStatus()));
        }

        return specification;
    }
}
