import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const QuizCard = ({ quiz, onDelete }) => {
    return (
        <article
            className="
                group flex h-full min-w-0 flex-col
                overflow-hidden
                rounded-2xl border border-gray-200
                bg-white p-4
                shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-md
                sm:p-5
                dark:border-gray-800
                dark:bg-gray-900
            "
        >
            {/* Header */}
            <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                    <h3
                        className="
                            truncate text-base font-semibold
                            text-gray-900
                            sm:text-lg
                            dark:text-white
                        "
                        title={quiz.title}
                    >
                        {quiz.title}
                    </h3>

                    <p
                        className="
                            mt-1 truncate text-xs
                            text-gray-500
                            sm:text-sm
                            dark:text-gray-400
                        "
                        title={quiz.topic}
                    >
                        {quiz.topic}
                    </p>
                </div>

                <span
                    className="
                        shrink-0 rounded-full
                        bg-violet-50 px-2.5 py-1
                        text-[10px] font-semibold uppercase tracking-wide
                        text-violet-700
                        sm:px-3 sm:text-xs
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
                    mt-4 flex flex-wrap items-center gap-x-3 gap-y-2
                    border-t border-gray-100
                    pt-4
                    text-xs text-gray-500
                    sm:mt-5 sm:text-sm
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
                            className="
                                h-1 w-1 shrink-0 rounded-full
                                bg-gray-300
                                dark:bg-gray-600
                            "
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
                <div
                    className="
                        grid grid-cols-1 gap-2
                        sm:grid-cols-2
                    "
                >
                    <Link
                        to={`/ai-quiz/${quiz.id}/attempt`}
                        className="
                            inline-flex min-h-11 w-full
                            items-center justify-center
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
                                inline-flex min-h-11 w-full
                                items-center justify-center
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
                                inline-flex min-h-11 w-full
                                items-center justify-center
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
                            mt-2.5 min-h-11 w-full
                            rounded-xl
                            border border-red-200
                            bg-white
                            px-4 py-2.5
                            text-sm font-semibold
                            text-red-600
                            transition
                            hover:border-red-300
                            hover:bg-red-50
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