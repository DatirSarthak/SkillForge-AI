import PropTypes from "prop-types";

const DeleteQuizDialog = ({
    quiz,
    open,
    isDeleting = false,
    onConfirm,
    onCancel,
}) => {
    if (!open || !quiz) {
        return null;
    }

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-gray-950/60
                px-4
                backdrop-blur-sm
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-quiz-title"
        >
            <div
                className="
                    w-full max-w-md
                    overflow-hidden
                    rounded-3xl
                    border border-gray-200
                    bg-white
                    shadow-2xl
                    dark:border-gray-800
                    dark:bg-gray-900
                "
            >
                {/* Header */}
                <div className="p-6 sm:p-7">
                    <div className="flex items-start gap-4">
                        <div
                            className="
                                flex h-11 w-11 shrink-0
                                items-center justify-center
                                rounded-2xl
                                bg-red-100
                                text-red-600
                                dark:bg-red-500/10
                                dark:text-red-400
                            "
                            aria-hidden="true"
                        >
                            !
                        </div>

                        <div className="min-w-0">
                            <h2
                                id="delete-quiz-title"
                                className="
                                    text-xl font-bold
                                    text-gray-900
                                    dark:text-white
                                "
                            >
                                Delete Quiz?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    "{quiz.title}"
                                </span>
                                ?
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                            mt-5 rounded-xl
                            bg-gray-50 px-4 py-3
                            text-sm text-gray-500
                            dark:bg-gray-800
                            dark:text-gray-400
                        "
                    >
                        This action cannot be undone.
                    </div>
                </div>

                {/* Actions */}
                <div
                    className="
                        flex flex-col-reverse gap-3
                        border-t border-gray-100
                        bg-gray-50/70
                        p-5
                        sm:flex-row sm:justify-end
                        dark:border-gray-800
                        dark:bg-gray-950/30
                    "
                >
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="
                            rounded-xl
                            border border-gray-300
                            bg-white
                            px-5 py-2.5
                            text-sm font-semibold
                            text-gray-700
                            transition
                            hover:bg-gray-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                            dark:border-gray-700
                            dark:bg-gray-900
                            dark:text-gray-300
                            dark:hover:bg-gray-800
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="
                            inline-flex items-center justify-center gap-2
                            rounded-xl
                            bg-red-600
                            px-5 py-2.5
                            text-sm font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-red-700
                            hover:shadow
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            focus:outline-none
                            focus:ring-2
                            focus:ring-red-500
                            focus:ring-offset-2
                            dark:focus:ring-offset-gray-900
                        "
                    >
                        {isDeleting && (
                            <span
                                className="
                                    h-4 w-4 animate-spin
                                    rounded-full
                                    border-2 border-white/40
                                    border-t-white
                                "
                            />
                        )}

                        {isDeleting ? "Deleting..." : "Delete Quiz"}
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteQuizDialog.propTypes = {
    quiz: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
    }),

    open: PropTypes.bool,

    isDeleting: PropTypes.bool,

    onConfirm: PropTypes.func,

    onCancel: PropTypes.func,
};

export default DeleteQuizDialog;