import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    useQuiz,
    useSubmitQuiz,
} from "../../hooks/useQuiz";

import QuizQuestion from "./components/QuizQuestion";
import QuizProgress from "./components/QuizProgress";
import QuizNavigation from "./components/QuizNavigation";

const QuizAttemptPage = () => {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuiz(quizId);

    const submitQuizMutation = useSubmitQuiz();

    const quiz = data?.data;

    const questions = useMemo(
        () => quiz?.questions ?? [],
        [quiz]
    );

    const currentQuestion = questions[currentIndex];

    const selectedOption = currentQuestion
        ? answers[currentQuestion.id]
        : undefined;

    const answeredCount = Object.keys(answers).length;

    const handleSelectOption = (option) => {
        if (!currentQuestion) {
            return;
        }

        setAnswers((previous) => ({
            ...previous,
            [currentQuestion.id]: option,
        }));
    };

    const handlePrevious = () => {
        setCurrentIndex((previous) =>
            Math.max(previous - 1, 0)
        );
    };

    const handleNext = () => {
        setCurrentIndex((previous) =>
            Math.min(previous + 1, questions.length - 1)
        );
    };

    const handleSubmit = async () => {
        if (questions.length === 0) {
            return;
        }

        if (answeredCount !== questions.length) {
            return;
        }

        const payload = {
            answers: questions.map((question) => ({
                questionId: question.id,
                selectedOption: answers[question.id],
            })),
        };

        try {
            const response = await submitQuizMutation.mutateAsync({
                quizId,
                payload,
            });

            const attemptId = response?.data?.attemptId;

            if (attemptId) {
                navigate(`/ai-quiz/attempts/${attemptId}/result`, {
                    replace: true,
                });
            }
        } catch (err) {
            console.error("Quiz submission failed:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Loading quiz...
                </p>
            </div>
        );
    }

    if (isError || !quiz) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
                <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/30">
                    <h1 className="font-semibold text-red-700 dark:text-red-400">
                        Unable to load quiz
                    </h1>

                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {error?.message || "Quiz not found."}
                    </p>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
                <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        No questions available
                    </h1>
                </div>
            </div>
        );
    }

    const isLastQuestion =
        currentIndex === questions.length - 1;

    const allAnswered =
        answeredCount === questions.length;

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {quiz.title}
                    </h1>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {quiz.topic} • {quiz.difficulty}
                    </p>
                </div>

                <div className="mb-6">
                    <QuizProgress
                        currentQuestion={currentIndex + 1}
                        totalQuestions={questions.length}
                        answeredQuestions={answeredCount}
                    />
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">

                    <QuizQuestion
                        question={currentQuestion}
                        questionNumber={currentIndex + 1}
                        selectedOption={selectedOption}
                        onSelectOption={handleSelectOption}
                    />

                    <div className="mt-8">
                        <QuizNavigation
                            currentQuestion={currentIndex + 1}
                            totalQuestions={questions.length}
                            canSubmit={allAnswered}
                            isSubmitting={submitQuizMutation.isPending}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                            onSubmit={handleSubmit}
                        />
                    </div>

                    {submitQuizMutation.isError && (
                        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                            <p className="text-sm text-red-700 dark:text-red-400">
                                Failed to submit quiz. Please try again.
                            </p>
                        </div>
                    )}

                    {!allAnswered && isLastQuestion && (
                        <p className="mt-4 text-center text-sm text-amber-600 dark:text-amber-400">
                            Please answer all questions before submitting.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizAttemptPage;