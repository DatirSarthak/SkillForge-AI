import { useNavigate } from "react-router-dom";

const QuizResult = ({
    result,
    onRetry,
    onBackToQuizzes,
}) => {
    const navigate = useNavigate();

    if (!result) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400">
                    Quiz result is not available.
                </p>
            </div>
        );
    }

    const {
        score = 0,
        totalQuestions = 0,
        percentage = 0,
        answers = [],
    } = result;

    const handleBackToQuizzes = () => {
        if (onBackToQuizzes) {
            onBackToQuizzes();
            return;
        }

        navigate("/ai-quiz");
    };

    return (
        <div className="mx-auto w-full max-w-2xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 sm:p-8">
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Quiz Completed
                    </p>

                    <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                        Your Result
                    </h1>

                    <div className="mt-8">
                        <div className="text-5xl font-bold text-gray-900 dark:text-white">
                            {percentage}%
                        </div>

                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {score} out of {totalQuestions} correct
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Score
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                            {score}/{totalQuestions}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-800">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Percentage
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                            {percentage}%
                        </p>
                    </div>
                </div>

                {answers.length > 0 && (
                    <div className="mt-8">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Question Review
                        </h2>

                        <div className="space-y-4">
                            {answers.map((answer, index) => (
                                <div
                                    key={answer.questionId}
                                    className={`rounded-xl border p-4 ${answer.correct
                                            ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                                            : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Question {answer.questionOrder ?? index + 1}
                                            </p>

                                            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                                {answer.questionText}
                                            </p>
                                        </div>

                                        <span
                                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${answer.correct
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                                                    : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                                                }`}
                                        >
                                            {answer.correct ? "Correct" : "Wrong"}
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2 text-sm">
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <span className="font-semibold">
                                                Your answer:
                                            </span>{" "}
                                            {answer.selectedOption}
                                        </p>

                                        {!answer.correct && (
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <span className="font-semibold">
                                                    Correct answer:
                                                </span>{" "}
                                                {answer.correctOption}
                                            </p>
                                        )}

                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold">
                                                Explanation:
                                            </span>{" "}
                                            {answer.explanation}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {onRetry && (
                        <button
                            type="button"
                            onClick={onRetry}
                            className="flex-1 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                        >
                            Try Again
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleBackToQuizzes}
                        className="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                        Back to Quizzes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizResult;