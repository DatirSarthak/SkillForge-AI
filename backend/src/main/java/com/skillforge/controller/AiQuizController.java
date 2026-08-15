package com.skillforge.controller;

import com.skillforge.dto.ApiResponse;
import com.skillforge.dto.quiz.QuizAttemptRequestDto;
import com.skillforge.dto.quiz.QuizGenerateRequestDto;
import com.skillforge.dto.quiz.QuizResponseDto;
import com.skillforge.dto.quiz.QuizResultDto;
import com.skillforge.dto.quiz.QuizSummaryDto;
import com.skillforge.service.AiQuizService;
import com.skillforge.util.ResponseUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ai/quizzes")
@RequiredArgsConstructor
public class AiQuizController {

        private final AiQuizService aiQuizService;

        @PostMapping("/generate")
        public ResponseEntity<ApiResponse<QuizResponseDto>> generateQuiz(
                        @Valid @RequestBody QuizGenerateRequestDto request,
                        HttpServletRequest httpRequest) {

                QuizResponseDto response = aiQuizService.generateQuiz(request);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(
                                                ResponseUtil.success(
                                                                "Quiz generated successfully.",
                                                                response,
                                                                httpRequest.getRequestURI()));
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<QuizSummaryDto>>> getUserQuizzes(
                        HttpServletRequest httpRequest) {

                List<QuizSummaryDto> quizzes = aiQuizService.getUserQuizzes();

                return ResponseEntity.ok(
                                ResponseUtil.success(
                                                "Quiz history retrieved successfully.",
                                                quizzes,
                                                httpRequest.getRequestURI()));
        }

        @GetMapping("/{quizId}")
        public ResponseEntity<ApiResponse<QuizResponseDto>> getQuiz(
                        @PathVariable UUID quizId,
                        HttpServletRequest httpRequest) {

                QuizResponseDto response = aiQuizService.getQuiz(quizId);

                return ResponseEntity.ok(
                                ResponseUtil.success(
                                                "Quiz retrieved successfully.",
                                                response,
                                                httpRequest.getRequestURI()));
        }

        @PostMapping("/{quizId}/submit")
        public ResponseEntity<ApiResponse<QuizResultDto>> submitQuiz(
                        @PathVariable UUID quizId,
                        @Valid @RequestBody QuizAttemptRequestDto request,
                        HttpServletRequest httpRequest) {

                QuizResultDto result = aiQuizService.submitQuiz(
                                quizId,
                                request);

                return ResponseEntity.ok(
                                ResponseUtil.success(
                                                "Quiz submitted successfully.",
                                                result,
                                                httpRequest.getRequestURI()));
        }

        @GetMapping("/attempts/{attemptId}")
        public ResponseEntity<ApiResponse<QuizResultDto>> getAttempt(
                        @PathVariable UUID attemptId) {

                QuizResultDto result = aiQuizService.getAttempt(attemptId);

                return ResponseEntity.ok(
                                ApiResponse.success(
                                                "Quiz result retrieved successfully.",
                                                result));
        }

        @DeleteMapping("/{quizId}")
        public ResponseEntity<ApiResponse<Void>> deleteQuiz(
                        @PathVariable UUID quizId,
                        HttpServletRequest httpRequest) {

                aiQuizService.deleteQuiz(quizId);

                return ResponseEntity.ok(
                                ResponseUtil.success(
                                                "Quiz deleted successfully.",
                                                httpRequest.getRequestURI()));
        }
}
