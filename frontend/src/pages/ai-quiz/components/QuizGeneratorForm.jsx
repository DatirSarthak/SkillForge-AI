import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ChevronDown, Check } from "lucide-react";

import {
  QUIZ_DIFFICULTY_OPTIONS,
  QUIZ_DEFAULTS,
  QUIZ_QUESTION_COUNT_OPTIONS,
  QUIZ_LIMITS,
} from "../../../constants/quizConstants";

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  disabled,
  error,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  );

  const handleSelect = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (disabled) {
      return;
    }

    if (
      event.key === "Enter" ||
      event.key === " " ||
      event.key === "ArrowDown"
    ) {
      event.preventDefault();
      setOpen((current) => !current);
    }
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full min-w-0"
    >
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-options`}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        className={`
          flex w-full items-center justify-between gap-3
          rounded-xl border bg-white px-3.5 py-3
          text-left text-sm outline-none transition
          dark:bg-gray-800 dark:text-white
          ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
              : open
                ? "border-violet-500 ring-2 ring-violet-500/20"
                : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700"
          }
          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          }
        `}
      >
        <span className="min-w-0 truncate">
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={17}
          strokeWidth={2}
          className={`
            shrink-0 text-gray-500 transition-transform
            dark:text-gray-400
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && !disabled && (
        <div
          id={`${id}-options`}
          role="listbox"
          aria-label={placeholder}
          className="
            absolute left-0 right-0 top-[calc(100%+6px)] z-50
            max-h-56 overflow-y-auto
            rounded-xl border border-gray-200
            bg-white p-1.5 shadow-lg
            dark:border-gray-700 dark:bg-gray-800
          "
        >
          {options.map((option) => {
            const isSelected =
              String(option.value) === String(value);

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                className="
                  flex w-full items-center justify-between
                  gap-3 rounded-lg px-3 py-2.5
                  text-left text-sm
                  text-gray-700 transition
                  hover:bg-violet-50 hover:text-violet-700
                  focus:bg-violet-50 focus:text-violet-700
                  dark:text-gray-200
                  dark:hover:bg-violet-500/10
                  dark:hover:text-violet-300
                  dark:focus:bg-violet-500/10
                  dark:focus:text-violet-300
                "
              >
                <span className="truncate">
                  {option.label}
                </span>

                {isSelected && (
                  <Check
                    size={16}
                    className="shrink-0 text-violet-600 dark:text-violet-400"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const QuizGeneratorForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
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
    <div className="w-full overflow-visible rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:rounded-3xl">
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
            className="
              w-full min-w-0 rounded-xl
              border border-gray-200 bg-white
              px-3.5 py-3 text-sm outline-none transition
              focus:border-violet-500
              focus:ring-2 focus:ring-violet-500/20
              disabled:cursor-not-allowed disabled:opacity-60
              dark:border-gray-700 dark:bg-gray-800 dark:text-white
            "
          />

          {errors.topic && (
            <p className="mt-2 text-xs text-red-600 sm:text-sm">
              {errors.topic.message}
            </p>
          )}
        </div>

        {/* Difficulty + Questions */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {/* Difficulty */}
          <div className="min-w-0">
            <label
              htmlFor="quiz-difficulty"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Difficulty
            </label>

            <Controller
              name="difficulty"
              control={control}
              rules={{
                required: "Difficulty is required.",
              }}
              render={({ field }) => (
                <CustomSelect
                  id="quiz-difficulty"
                  value={field.value}
                  onChange={field.onChange}
                  options={QUIZ_DIFFICULTY_OPTIONS}
                  placeholder="Select difficulty"
                  disabled={isLoading}
                  error={errors.difficulty}
                />
              )}
            />

            {errors.difficulty && (
              <p className="mt-2 text-xs text-red-600 sm:text-sm">
                {errors.difficulty.message}
              </p>
            )}
          </div>

          {/* Number of Questions */}
          <div className="min-w-0">
            <label
              htmlFor="quiz-question-count"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Number of Questions
            </label>

            <Controller
              name="questionCount"
              control={control}
              rules={{
                required: "Question count is required.",
                validate: (value) => {
                  const numericValue = Number(value);

                  if (
                    numericValue < QUIZ_LIMITS.MIN_QUESTION_COUNT ||
                    numericValue > QUIZ_LIMITS.MAX_QUESTION_COUNT
                  ) {
                    return `Maximum ${QUIZ_LIMITS.MAX_QUESTION_COUNT} questions are allowed.`;
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <CustomSelect
                  id="quiz-question-count"
                  value={field.value}
                  onChange={field.onChange}
                  options={QUIZ_QUESTION_COUNT_OPTIONS}
                  placeholder="Select question count"
                  disabled={isLoading}
                  error={errors.questionCount}
                />
              )}
            />

            {errors.questionCount && (
              <p className="mt-2 text-xs text-red-600 sm:text-sm">
                {errors.questionCount.message}
              </p>
            )}
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
            className="
              inline-flex w-full items-center justify-center gap-2
              rounded-xl bg-violet-600 px-5 py-3
              text-sm font-semibold text-white shadow-sm
              transition hover:bg-violet-700
              disabled:cursor-not-allowed disabled:opacity-70
              sm:w-auto sm:min-w-[180px]
            "
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