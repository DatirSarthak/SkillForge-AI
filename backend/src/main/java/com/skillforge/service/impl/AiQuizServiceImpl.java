package com.skillforge.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.skillforge.constants.ErrorCodes;

import com.skillforge.dto.quiz.QuizAnswerDto;
import com.skillforge.dto.quiz.QuizAttemptAnswerDto;
import com.skillforge.dto.quiz.QuizAttemptRequestDto;
import com.skillforge.dto.quiz.QuizGenerateRequestDto;
import com.skillforge.dto.quiz.QuizResponseDto;
import com.skillforge.dto.quiz.QuizResultDto;
import com.skillforge.dto.quiz.QuizSummaryDto;
import com.skillforge.dto.quiz.ai.AiQuizQuestionDto;
import com.skillforge.dto.quiz.ai.AiQuizResponseDto;

import com.skillforge.entity.Quiz;
import com.skillforge.entity.QuizAttempt;
import com.skillforge.entity.QuizAttemptAnswer;
import com.skillforge.entity.QuizDifficulty;
import com.skillforge.entity.QuizQuestion;
import com.skillforge.entity.User;

import com.skillforge.exception.AiException;
import com.skillforge.exception.ConflictException;
import com.skillforge.exception.ResourceNotFoundException;

import com.skillforge.mapper.AiQuizMapper;
import com.skillforge.repository.QuizAttemptAnswerRepository;
import com.skillforge.repository.QuizAttemptRepository;
import com.skillforge.repository.QuizRepository;

import com.skillforge.service.AiProvider;
import com.skillforge.service.AiQuizService;
import com.skillforge.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AiQuizServiceImpl implements AiQuizService {

        private final QuizRepository quizRepository;
        private final QuizAttemptRepository quizAttemptRepository;
        private final QuizAttemptAnswerRepository quizAttemptAnswerRepository;
        private final UserService userService;
        private final AiProvider aiProvider;
        private final AiQuizMapper aiQuizMapper;
        private final ObjectMapper objectMapper;

        @Override
        public QuizResponseDto generateQuiz(
                        QuizGenerateRequestDto request) {

                User currentUser = userService.getCurrentUserEntity();

                QuizDifficulty difficulty = parseDifficulty(
                                request.difficulty());

                String prompt = buildQuizPrompt(
                                request.topic(),
                                difficulty,
                                request.questionCount());

                log.info(
                                "Generating AI quiz for user: {}, topic: {}, difficulty: {}, questionCount: {}",
                                currentUser.getId(),
                                request.topic(),
                                difficulty,
                                request.questionCount());

                String aiResponse = aiProvider.generateResponse(prompt);

                AiQuizResponseDto generatedQuiz = parseAiResponse(aiResponse);

                validateGeneratedQuiz(
                                generatedQuiz,
                                request,
                                difficulty);

                Quiz quiz = buildQuizEntity(
                                currentUser,
                                request,
                                difficulty,
                                generatedQuiz);

                Quiz savedQuiz = quizRepository.save(quiz);

                log.info(
                                "AI quiz generated successfully. quizId={}, userId={}",
                                savedQuiz.getId(),
                                currentUser.getId());

                return aiQuizMapper.toResponseDto(savedQuiz);
        }

        @Override
        @Transactional(readOnly = true)
        public List<QuizSummaryDto> getUserQuizzes() {

                User currentUser = userService.getCurrentUserEntity();

                return quizRepository
                                .findByUserOrderByCreatedAtDesc(currentUser)
                                .stream()
                                .map(quiz -> {

                                        QuizSummaryDto summary = aiQuizMapper.toSummaryDto(quiz);

                                        UUID attemptId = quiz.getAttempts()
                                                        .stream()
                                                        .max(
                                                                        java.util.Comparator.comparing(
                                                                                        QuizAttempt::getCompletedAt))
                                                        .map(QuizAttempt::getId)
                                                        .orElse(null);

                                        return new QuizSummaryDto(
                                                        summary.id(),
                                                        summary.title(),
                                                        summary.topic(),
                                                        summary.difficulty(),
                                                        summary.questionCount(),
                                                        summary.createdAt(),
                                                        attemptId);
                                })
                                .toList();
        }

        @Override
        @Transactional(readOnly = true)
        public QuizResponseDto getQuiz(UUID quizId) {

                User currentUser = userService.getCurrentUserEntity();

                Quiz quiz = getOwnedQuiz(
                                quizId,
                                currentUser);

                return aiQuizMapper.toResponseDto(quiz);
        }

        @Override
        public QuizResultDto submitQuiz(
                        UUID quizId,
                        QuizAttemptRequestDto request) {

                User currentUser = userService.getCurrentUserEntity();

                Quiz quiz = getOwnedQuiz(
                                quizId,
                                currentUser);

                validateSubmittedAnswers(
                                quiz,
                                request.answers());

                int score = calculateScore(
                                quiz,
                                request.answers());

                int totalQuestions = quiz.getQuestions().size();

                double percentage = calculatePercentage(
                                score,
                                totalQuestions);

                QuizAttempt attempt = QuizAttempt.builder()
                                .quiz(quiz)
                                .user(currentUser)
                                .score(score)
                                .totalQuestions(totalQuestions)
                                .percentage(percentage)
                                .build();

                QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);

                Map<UUID, String> submittedAnswers = request.answers()
                                .stream()
                                .collect(
                                                java.util.stream.Collectors.toMap(
                                                                QuizAnswerDto::questionId,
                                                                answer -> answer.selectedOption().toUpperCase()));

                for (QuizQuestion question : quiz.getQuestions()) {

                        String selectedOption = submittedAnswers.get(question.getId());

                        boolean correct = question.getCorrectOption()
                                        .equalsIgnoreCase(selectedOption);

                        QuizAttemptAnswer attemptAnswer = QuizAttemptAnswer.builder()
                                        .attempt(savedAttempt)
                                        .question(question)
                                        .selectedOption(selectedOption)
                                        .correctOption(question.getCorrectOption())
                                        .correct(correct)
                                        .build();

                        quizAttemptAnswerRepository.save(attemptAnswer);
                }

                log.info(
                                "Quiz submitted successfully. quizId={}, attemptId={}, userId={}, score={}/{}",
                                quizId,
                                savedAttempt.getId(),
                                currentUser.getId(),
                                score,
                                totalQuestions);

                return new QuizResultDto(
                                savedAttempt.getId(),
                                quiz.getId(),
                                score,
                                totalQuestions,
                                percentage,
                                savedAttempt.getCompletedAt(),
                                buildAttemptAnswers(savedAttempt));
        }

        @Override
        @Transactional(readOnly = true)
        public QuizResultDto getAttempt(UUID attemptId) {

                User currentUser = userService.getCurrentUserEntity();

                QuizAttempt attempt = quizAttemptRepository
                                .findByIdAndUser(
                                                attemptId,
                                                currentUser)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Quiz attempt not found."));

                List<QuizAttemptAnswerDto> answers = buildAttemptAnswers(attempt);

                return new QuizResultDto(
                                attempt.getId(),
                                attempt.getQuiz().getId(),
                                attempt.getScore(),
                                attempt.getTotalQuestions(),
                                attempt.getPercentage(),
                                attempt.getCompletedAt(),
                                answers);
        }

        @Override
        @Transactional
        public void deleteQuiz(UUID quizId) {

                User currentUser = userService.getCurrentUserEntity();

                Quiz quiz = getOwnedQuiz(
                                quizId,
                                currentUser);

                List<QuizAttempt> attempts = quizAttemptRepository.findByQuizId(quizId);

                for (QuizAttempt attempt : attempts) {
                        quizAttemptAnswerRepository.deleteByAttempt(attempt);
                }

                quizAttemptRepository.deleteAll(attempts);

                quizRepository.delete(quiz);

                log.info(
                                "Quiz deleted successfully. quizId={}, userId={}, attemptsDeleted={}",
                                quizId,
                                currentUser.getId(),
                                attempts.size());
        }

        private Quiz getOwnedQuiz(
                        UUID quizId,
                        User currentUser) {

                return quizRepository
                                .findByIdAndUser(
                                                quizId,
                                                currentUser)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Quiz not found."));
        }

        private QuizDifficulty parseDifficulty(
                        String difficulty) {

                if (difficulty == null ||
                                difficulty.isBlank()) {

                        throw new IllegalArgumentException(
                                        "Quiz difficulty is required.");
                }

                try {

                        return QuizDifficulty.valueOf(
                                        difficulty.trim().toUpperCase());

                } catch (IllegalArgumentException ex) {

                        throw new IllegalArgumentException(
                                        "Invalid quiz difficulty. Allowed values: EASY, MEDIUM, HARD.");
                }
        }

        private String buildQuizPrompt(
                        String topic,
                        QuizDifficulty difficulty,
                        int questionCount) {

                return """
                                Generate a multiple-choice educational quiz.

                                Topic: %s
                                Difficulty: %s
                                Number of questions: %d

                                STRICT RULES:

                                1. Return ONLY valid JSON.
                                2. Do not return Markdown.
                                3. Do not wrap the response in ```json or ``` blocks.
                                4. Generate exactly %d questions.
                                5. Every question must contain exactly four options.
                                6. Option keys must be exactly A, B, C and D.
                                7. correctOption must be exactly A, B, C or D.
                                8. Every question must have a useful explanation.
                                9. Do not create duplicate questions.
                                10. Keep questions relevant to the requested topic.
                                11. Do not add fields outside the specified JSON structure.

                                Required JSON structure:

                                {
                                  "title": "Short quiz title",
                                  "topic": "%s",
                                  "difficulty": "%s",
                                  "questions": [
                                    {
                                      "questionText": "Question text",
                                      "options": {
                                        "A": "Option A",
                                        "B": "Option B",
                                        "C": "Option C",
                                        "D": "Option D"
                                      },
                                      "correctOption": "A",
                                      "explanation": "Explanation of the correct answer"
                                    }
                                  ]
                                }
                                """.formatted(
                                topic,
                                difficulty,
                                questionCount,
                                questionCount,
                                topic,
                                difficulty);
        }

        private AiQuizResponseDto parseAiResponse(
                        String aiResponse) {

                if (aiResponse == null ||
                                aiResponse.isBlank()) {

                        throw new AiException(
                                        "Empty quiz response received from AI.");
                }

                try {

                        String cleanedResponse = cleanJsonResponse(aiResponse);

                        return objectMapper.readValue(
                                        cleanedResponse,
                                        AiQuizResponseDto.class);

                } catch (JsonProcessingException ex) {

                        log.error(
                                        "Failed to parse AI quiz response: {}",
                                        aiResponse,
                                        ex);

                        throw new AiException(
                                        "AI returned an invalid quiz response.");
                }
        }

        private String cleanJsonResponse(
                        String response) {

                String cleaned = response.trim();

                if (cleaned.startsWith("```json")) {
                        cleaned = cleaned.substring(7);
                } else if (cleaned.startsWith("```")) {
                        cleaned = cleaned.substring(3);
                }

                if (cleaned.endsWith("```")) {
                        cleaned = cleaned.substring(
                                        0,
                                        cleaned.length() - 3);
                }

                return cleaned.trim();
        }

        private void validateGeneratedQuiz(
                        AiQuizResponseDto generatedQuiz,
                        QuizGenerateRequestDto request,
                        QuizDifficulty requestedDifficulty) {

                if (generatedQuiz == null) {
                        throw new AiException(
                                        "AI generated an empty quiz.");
                }

                if (generatedQuiz.questions() == null ||
                                generatedQuiz.questions().size() != request.questionCount()) {

                        throw new AiException(
                                        "AI generated an invalid number of questions.");
                }

                if (generatedQuiz.title() == null ||
                                generatedQuiz.title().isBlank()) {

                        throw new AiException(
                                        "AI generated quiz without a title.");
                }

                for (AiQuizQuestionDto question : generatedQuiz.questions()) {

                        validateGeneratedQuestion(question);
                }

                if (generatedQuiz.difficulty() != null &&
                                !generatedQuiz.difficulty()
                                                .equalsIgnoreCase(
                                                                requestedDifficulty.name())) {

                        log.warn(
                                        "AI returned different difficulty. Requested={}, Returned={}",
                                        requestedDifficulty,
                                        generatedQuiz.difficulty());
                }
        }

        private void validateGeneratedQuestion(
                        AiQuizQuestionDto question) {

                if (question == null ||
                                question.questionText() == null ||
                                question.questionText().isBlank()) {

                        throw new AiException(
                                        "AI generated an invalid question.");
                }

                Map<String, String> options = question.options();

                if (options == null ||
                                options.size() != 4) {

                        throw new AiException(
                                        "Each quiz question must contain exactly four options.");
                }

                List<String> requiredOptions = List.of("A", "B", "C", "D");

                for (String option : requiredOptions) {

                        if (!options.containsKey(option) ||
                                        options.get(option) == null ||
                                        options.get(option).isBlank()) {

                                throw new AiException(
                                                "AI generated invalid quiz options.");
                        }
                }

                if (question.correctOption() == null ||
                                !requiredOptions.contains(
                                                question.correctOption())) {

                        throw new AiException(
                                        "AI generated an invalid correct option.");
                }

                if (question.explanation() == null ||
                                question.explanation().isBlank()) {

                        throw new AiException(
                                        "AI generated a question without an explanation.");
                }
        }

        private Quiz buildQuizEntity(
                        User currentUser,
                        QuizGenerateRequestDto request,
                        QuizDifficulty difficulty,
                        AiQuizResponseDto generatedQuiz) {

                Quiz quiz = Quiz.builder()
                                .user(currentUser)
                                .title(generatedQuiz.title().trim())
                                .topic(request.topic().trim())
                                .difficulty(difficulty)
                                .questionCount(request.questionCount())
                                .build();

                List<QuizQuestion> questions = new ArrayList<>();

                int questionOrder = 1;

                for (AiQuizQuestionDto aiQuestion : generatedQuiz.questions()) {

                        QuizQuestion question = QuizQuestion.builder()
                                        .questionText(
                                                        aiQuestion.questionText().trim())
                                        .optionA(
                                                        aiQuestion.options()
                                                                        .get("A")
                                                                        .trim())
                                        .optionB(
                                                        aiQuestion.options()
                                                                        .get("B")
                                                                        .trim())
                                        .optionC(
                                                        aiQuestion.options()
                                                                        .get("C")
                                                                        .trim())
                                        .optionD(
                                                        aiQuestion.options()
                                                                        .get("D")
                                                                        .trim())
                                        .correctOption(
                                                        aiQuestion.correctOption())
                                        .explanation(
                                                        aiQuestion.explanation().trim())
                                        .questionOrder(questionOrder++)
                                        .build();

                        quiz.addQuestion(question);

                        questions.add(question);
                }

                return quiz;
        }

        private void validateSubmittedAnswers(
                        Quiz quiz,
                        List<QuizAnswerDto> answers) {

                if (answers == null ||
                                answers.isEmpty()) {

                        throw new IllegalArgumentException(
                                        "At least one answer is required.");
                }

                if (answers.size() != quiz.getQuestions().size()) {

                        throw new IllegalArgumentException(
                                        "All quiz questions must be answered.");
                }

                long distinctQuestionIds = answers.stream()
                                .map(QuizAnswerDto::questionId)
                                .distinct()
                                .count();

                if (distinctQuestionIds != answers.size()) {

                        throw new IllegalArgumentException(
                                        "Duplicate question answers are not allowed.");
                }

                for (QuizAnswerDto answer : answers) {

                        if (answer.questionId() == null) {

                                throw new IllegalArgumentException(
                                                "Question ID is required.");
                        }

                        if (answer.selectedOption() == null ||
                                        !List.of("A", "B", "C", "D")
                                                        .contains(
                                                                        answer.selectedOption()
                                                                                        .toUpperCase())) {

                                throw new IllegalArgumentException(
                                                "Selected option must be A, B, C or D.");
                        }

                        boolean questionBelongsToQuiz = quiz.getQuestions()
                                        .stream()
                                        .anyMatch(question -> question.getId()
                                                        .equals(
                                                                        answer.questionId()));

                        if (!questionBelongsToQuiz) {

                                throw new IllegalArgumentException(
                                                "Question does not belong to this quiz.");
                        }
                }
        }

        private int calculateScore(
                        Quiz quiz,
                        List<QuizAnswerDto> answers) {

                Map<UUID, String> submittedAnswers = answers.stream()
                                .collect(
                                                java.util.stream.Collectors.toMap(
                                                                QuizAnswerDto::questionId,
                                                                answer -> answer.selectedOption()
                                                                                .toUpperCase()));

                int score = 0;

                for (QuizQuestion question : quiz.getQuestions()) {

                        String selectedOption = submittedAnswers.get(
                                        question.getId());

                        if (question.getCorrectOption()
                                        .equalsIgnoreCase(selectedOption)) {

                                score++;
                        }
                }

                return score;
        }

        private double calculatePercentage(
                        int score,
                        int totalQuestions) {

                if (totalQuestions <= 0) {
                        return 0.0;
                }

                double percentage = ((double) score / totalQuestions) * 100;

                return Math.round(
                                percentage * 100.0) / 100.0;
        }

        private List<QuizAttemptAnswerDto> buildAttemptAnswers(
                        QuizAttempt attempt) {

                List<QuizAttemptAnswer> answers = quizAttemptAnswerRepository
                                .findByAttemptOrderByQuestionQuestionOrderAsc(
                                                attempt);

                return answers.stream()
                                .map(answer -> {

                                        QuizQuestion question = answer.getQuestion();

                                        return new QuizAttemptAnswerDto(
                                                        question.getId(),
                                                        question.getQuestionOrder(),
                                                        question.getQuestionText(),
                                                        answer.getSelectedOption(),
                                                        answer.getCorrectOption(),
                                                        answer.getCorrect(),
                                                        question.getExplanation());
                                })
                                .toList();
        }
}
