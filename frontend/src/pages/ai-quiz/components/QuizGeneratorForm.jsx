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
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-5 dark:border-gray-800 sm:px-7">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-xl dark:bg-violet-500/10">
            ✨
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              AI Quiz Generator
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Create a personalized quiz with AI and test your knowledge.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-6 p-6 sm:p-7"
      >
        {/* Topic */}
        <div>
          <label
            htmlFor="quiz-topic"
            className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
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
            className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-800/70 dark:text-white dark:placeholder:text-gray-500 ${
              errors.topic
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 dark:border-gray-700"
            }`}
          />

          {errors.topic && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.topic.message}
            </p>
          )}
        </div>

        {/* Difficulty + Question Count */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Difficulty */}
          <div>
            <label
              htmlFor="quiz-difficulty"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Difficulty
            </label>

            <select
              id="quiz-difficulty"
              disabled={isLoading}
              {...register("difficulty", {
                required: "Difficulty is required.",
              })}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white"
            >
              {QUIZ_DIFFICULTY_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            {errors.difficulty && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.difficulty.message}
              </p>
            )}
          </div>

          {/* Question Count */}
          <div>
            <label
              htmlFor="quiz-question-count"
              className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300"
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
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white"
            >
              {QUIZ_QUESTION_COUNT_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            {errors.questionCount && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.questionCount.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col gap-3 border-t border-gray-100 pt-2 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            AI generation may take a few seconds.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-offset-gray-900"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Generating...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Quiz
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizGeneratorForm;