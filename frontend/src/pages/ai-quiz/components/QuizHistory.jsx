import PropTypes from "prop-types";
import QuizCard from "./QuizCard";

const QuizHistory = ({
    quizzes,
    loading,
    error,
    onDeleteQuiz,
}) => {
    if (loading) {
        return (
            <section
                className="
                    rounded-2xl border border-gray-200
                    bg-white p-10 text-center shadow-sm
                    dark:border-gray-800
                    dark:bg-gray-900
                "
            >
                <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div
                        className="
                            h-8 w-8 animate-spin rounded-full
                            border-2 border-gray-200
                            border-t-violet-600
                            dark:border-gray-700
                            dark:border-t-violet-400
                        "
                    />

                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Loading quizzes...
                    </p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section
                className="
                    rounded-2xl border border-red-200
                    bg-red-50 p-6
                    dark:border-red-900
                    dark:bg-red-950/30
                "
            >
                <p className="font-medium text-red-700 dark:text-red-400">
                    {error}
                </p>
            </section>
        );
    }

    if (!quizzes || quizzes.length === 0) {
        return (
            <section
                className="
                    rounded-2xl border border-gray-200
                    bg-white p-10 text-center shadow-sm
                    dark:border-gray-800
                    dark:bg-gray-900
                "
            >
                <div className="mx-auto max-w-md">
                    <div
                        className="
                            mx-auto flex h-12 w-12 items-center justify-center
                            rounded-2xl
                            bg-violet-100
                            text-xl
                            dark:bg-violet-500/10
                        "
                    >
                        ✨
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                        No quizzes yet
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        Generate your first AI quiz to start practicing.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section>
            {/* Section Header */}
            <div className="mb-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
                            Quiz History
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Your previously generated quizzes.
                        </p>
                    </div>

                    <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                        {quizzes.length}{" "}
                        {quizzes.length === 1 ? "Quiz" : "Quizzes"}
                    </span>
                </div>
            </div>

            {/* Quiz Cards */}
            <div
                className="
                    grid items-stretch
                    gap-5
                    md:grid-cols-2
                    xl:grid-cols-3
                "
            >
                {quizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        onDelete={onDeleteQuiz}
                    />
                ))}
            </div>
        </section>
    );
};

QuizHistory.propTypes = {
    quizzes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            topic: PropTypes.string,
            difficulty: PropTypes.string,
            questionCount: PropTypes.number,
            createdAt: PropTypes.string,
            attemptId: PropTypes.string,
        })
    ),

    loading: PropTypes.bool,

    error: PropTypes.string,

    onDeleteQuiz: PropTypes.func,
};

QuizHistory.defaultProps = {
    quizzes: [],
    loading: false,
    error: null,
    onDeleteQuiz: undefined,
};

export default QuizHistory;