import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz, onDelete }) => {
    return (
        <article
            className="
                group flex h-full flex-col
                rounded-2xl border border-gray-200
                bg-white p-5
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-md
                dark:border-gray-800
                dark:bg-gray-900
            "
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <h3
                        className="
                            truncate text-lg font-semibold
                            text-gray-900
                            dark:text-white
                        "
                        title={quiz.title}
                    >
                        {quiz.title}
                    </h3>

                    <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
                        {quiz.topic}
                    </p>
                </div>

                <span
                    className="
                        shrink-0 rounded-full
                        bg-violet-50 px-3 py-1
                        text-xs font-semibold uppercase tracking-wide
                        text-violet-700
                        dark:bg-violet-500/10
                        dark:text-violet-300
                    "
                >
                    {quiz.difficulty}
                </span>
            </div>

            {/* Metadata */}
            <div
                className="
                    mt-5 flex items-center gap-4
                    border-t border-gray-100
                    pt-4
                    text-sm text-gray-500
                    dark:border-gray-800
                    dark:text-gray-400
                "
            >
                <span className="font-medium">
                    {quiz.questionCount} Questions
                </span>

                {quiz.createdAt && (
                    <>
                        <span
                            className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"
                            aria-hidden="true"
                        />

                        <span>
                            {new Date(quiz.createdAt).toLocaleDateString()}
                        </span>
                    </>
                )}
            </div>

            {/* Actions */}
            <div className="mt-auto pt-5">
                <div className="grid grid-cols-2 gap-2">
                    <Link
                        to={`/ai-quiz/${quiz.id}/attempt`}
                        className="
                            inline-flex items-center justify-center
                            rounded-xl
                            bg-violet-600
                            px-4 py-2.5
                            text-sm font-semibold text-white
                            shadow-sm
                            transition
                            hover:bg-violet-700
                            hover:shadow
                            focus:outline-none
                            focus:ring-2
                            focus:ring-violet-500
                            focus:ring-offset-2
                            dark:focus:ring-offset-gray-900
                        "
                    >
                        Start Quiz
                    </Link>

                    {quiz.attemptId ? (
                        <Link
                            to={`/ai-quiz/attempts/${quiz.attemptId}/result`}
                            className="
                                inline-flex items-center justify-center
                                rounded-xl
                                border border-emerald-200
                                bg-emerald-50
                                px-4 py-2.5
                                text-sm font-semibold
                                text-emerald-700
                                transition
                                hover:bg-emerald-100
                                dark:border-emerald-900
                                dark:bg-emerald-950/30
                                dark:text-emerald-300
                                dark:hover:bg-emerald-950/50
                            "
                        >
                            View Result
                        </Link>
                    ) : (
                        <span
                            className="
                                inline-flex items-center justify-center
                                rounded-xl
                                border border-gray-200
                                bg-gray-50
                                px-3 py-2.5
                                text-center
                                text-xs font-medium
                                text-gray-400
                                dark:border-gray-700
                                dark:bg-gray-800
                                dark:text-gray-500
                            "
                        >
                            Result after attempt
                        </span>
                    )}
                </div>

                {/* Delete */}
                {onDelete && (
                    <button
                        type="button"
                        onClick={() => onDelete(quiz)}
                        className="
                            mt-2.5 w-full
                            rounded-xl
                            border border-red-200
                            bg-white
                            px-4 py-2.5
                            text-sm font-semibold
                            text-red-600
                            transition
                            hover:bg-red-50
                            hover:border-red-300
                            focus:outline-none
                            focus:ring-2
                            focus:ring-red-500
                            focus:ring-offset-2
                            dark:border-red-900
                            dark:bg-gray-900
                            dark:text-red-400
                            dark:hover:bg-red-950/30
                            dark:focus:ring-offset-gray-900
                        "
                    >
                        Delete Quiz
                    </button>
                )}
            </div>
        </article>
    );
};

QuizCard.propTypes = {
    quiz: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        topic: PropTypes.string,
        difficulty: PropTypes.string,
        questionCount: PropTypes.number,
        createdAt: PropTypes.string,
        attemptId: PropTypes.string,
    }).isRequired,

    onDelete: PropTypes.func,
};

export default QuizCard;