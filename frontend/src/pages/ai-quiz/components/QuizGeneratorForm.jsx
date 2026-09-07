import { useForm } from "react-hook-form";

import {
  QUIZ_DIFFICULTY_OPTIONS,
  QUIZ_DEFAULTS,
  QUIZ_QUESTION_COUNT_OPTIONS,
  QUIZ_LIMITS,
} from "../../../constants/quizConstants";

const QuizGeneratorForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      topic: "",
      difficulty: QUIZ_DEFAULTS.difficulty,
      questionCount: QUIZ_DEFAULTS.questionCount,
    },
  });

  const handleFormSubmit = async (formData) => {
    const payload = {
      topic: formData.topic.trim(),
      difficulty: formData.difficulty,
      questionCount: Number(formData.questionCount),
    };

    await onSubmit(payload);

    reset();
  };


  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:rounded-3xl">

      {/* Header */}
      <div className="border-b border-gray-100 px-4 py-4 dark:border-gray-800 sm:px-6 sm:py-5 lg:px-7">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-lg dark:bg-violet-500/10 sm:h-11 sm:w-11 sm:rounded-2xl sm:text-xl">
            ✨
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-xl">
              AI Quiz Generator
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400 sm:text-sm sm:leading-6">
              Create a personalized quiz with AI and test your knowledge.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-7"
      >
        {/* Topic */}
        <div>
          <label
            htmlFor="quiz-topic"
            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Topic
          </label>

          <input
            id="quiz-topic"
            type="text"
            placeholder="e.g. Java Collections"
            disabled={isLoading}
            {...register("topic", {
              required: "Topic is required.",
              minLength: {
                value: QUIZ_LIMITS.MIN_TOPIC_LENGTH,
                message: `Topic must contain at least ${QUIZ_LIMITS.MIN_TOPIC_LENGTH} characters.`,
              },
              maxLength: {
                value: QUIZ_LIMITS.MAX_TOPIC_LENGTH,
                message: `Topic cannot exceed ${QUIZ_LIMITS.MAX_TOPIC_LENGTH} characters.`,
              },
            })}
            className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          {errors.topic && (
            <p className="mt-2 text-xs text-red-600 sm:text-sm">
              {errors.topic.message}
            </p>
          )}
        </div>

        {/* Difficulty + Questions */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">

          <div className="min-w-0">
            <label
              htmlFor="quiz-difficulty"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Difficulty
            </label>

            <select
              id="quiz-difficulty"
              disabled={isLoading}
              {...register("difficulty", {
                required: "Difficulty is required.",
              })}
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              {QUIZ_DIFFICULTY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <label
              htmlFor="quiz-question-count"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Number of Questions
            </label>

            <select
              id="quiz-question-count"
              disabled={isLoading}
              {...register("questionCount", {
                required: "Question count is required.",
                valueAsNumber: true,
                min: {
                  value: QUIZ_LIMITS.MIN_QUESTION_COUNT,
                  message: "Invalid question count.",
                },
                max: {
                  value: QUIZ_LIMITS.MAX_QUESTION_COUNT,
                  message: `Maximum ${QUIZ_LIMITS.MAX_QUESTION_COUNT} questions are allowed.`,
                },
              })}
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              {QUIZ_QUESTION_COUNT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 border-t border-gray-100 pt-5 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            AI generation may take a few seconds.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[180px]"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Generating...
              </>
            ) : (
              <>✨ Generate Quiz</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizGeneratorForm;