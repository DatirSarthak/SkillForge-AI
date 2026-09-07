import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    useQuizzes,
    useGenerateQuiz,
    useDeleteQuiz,
} from "../../hooks/useQuiz";

import QuizGeneratorForm from "./components/QuizGeneratorForm";
import QuizHistory from "./components/QuizHistory";
import DeleteQuizDialog from "./components/DeleteQuizDialog";

const AiQuizPage = () => {
    const navigate = useNavigate();

    const [quizToDelete, setQuizToDelete] = useState(null);

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuizzes();

    const generateQuizMutation = useGenerateQuiz();
    const deleteQuizMutation = useDeleteQuiz();

    const quizzes = data?.data ?? [];

    const handleGenerateQuiz = async (payload) => {
        try {
            const response =
                await generateQuizMutation.mutateAsync(payload);

            const quizId = response?.data?.id;

            if (!quizId) {
                throw new Error("Quiz ID was not returned by the server.");
            }

            navigate(`/ai-quiz/${quizId}/attempt`);
        } catch (err) {
            console.error("Quiz generation failed:", err);
        }
    };

    const handleDeleteRequest = (quiz) => {
        setQuizToDelete(quiz);
    };

    const handleDeleteConfirm = () => {
        if (!quizToDelete?.id) {
            return;
        }

        const quizId = quizToDelete.id;

        setQuizToDelete(null);

        deleteQuizMutation.mutate(quizId, {
            onError: (err) => {
                console.error("Quiz deletion failed:", err);
            },
        });
    };

    const handleDeleteCancel = () => {
        if (!deleteQuizMutation.isPending) {
            setQuizToDelete(null);
        }
    };

    return (
        <main
            className="
                min-h-screen w-full overflow-x-hidden
                bg-gray-50
                px-3 py-5
                sm:px-5 sm:py-6
                md:px-6
                lg:px-8 lg:py-8
                dark:bg-gray-950
            "
        >
            <div className="mx-auto w-full max-w-7xl min-w-0">

                {/* Page Header */}
                <div className="mb-6 sm:mb-8">
                    <h1
                        className="
                            text-2xl font-bold
                            text-gray-900
                            sm:text-3xl
                            dark:text-white
                        "
                    >
                        AI Quiz
                    </h1>

                    <p
                        className="
                            mt-2 max-w-2xl
                            text-sm leading-6
                            text-gray-600
                            sm:text-base
                            dark:text-gray-400
                        "
                    >
                        Generate AI-powered quizzes and test your knowledge.
                    </p>
                </div>

                {/* Generator */}
                <div className="w-full min-w-0">
                    <QuizGeneratorForm
                        onSubmit={handleGenerateQuiz}
                        isLoading={generateQuizMutation.isPending}
                    />
                </div>

                {/* History */}
                <section className="mt-8 w-full min-w-0 sm:mt-10">
                    {isLoading && (
                        <div
                            className="
                                rounded-2xl border border-gray-200
                                bg-white p-6 text-center
                                dark:border-gray-800
                                dark:bg-gray-900
                            "
                        >
                            <p
                                className="
                                    text-sm
                                    text-gray-600
                                    dark:text-gray-400
                                "
                            >
                                Loading quizzes...
                            </p>
                        </div>
                    )}

                    {isError && (
                        <div
                            className="
                                rounded-2xl border border-red-200
                                bg-red-50 p-5
                                sm:p-6
                                dark:border-red-900
                                dark:bg-red-950/30
                            "
                        >
                            <p
                                className="
                                    font-medium
                                    text-red-700
                                    dark:text-red-400
                                "
                            >
                                Failed to load quiz history.
                            </p>

                            {error?.message && (
                                <p
                                    className="
                                        mt-1 break-words text-sm
                                        text-red-600
                                        dark:text-red-500
                                    "
                                >
                                    {error.message}
                                </p>
                            )}
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <QuizHistory
                            quizzes={quizzes}
                            onDeleteQuiz={handleDeleteRequest}
                        />
                    )}
                </section>
            </div>

            {/* Delete Confirmation */}
            {quizToDelete && (
                <DeleteQuizDialog
                    quiz={quizToDelete}
                    open={Boolean(quizToDelete)}
                    isDeleting={deleteQuizMutation.isPending}
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}
        </main>
    );
};

export default AiQuizPage;