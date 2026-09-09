import { QUIZ_OPTION_KEYS } from "../../../constants/quizConstants";

const QuizOptions = ({
    options = [],
    selectedOption,
    onSelectOption,
    questionId,
}) => {
    const orderedOptions = QUIZ_OPTION_KEYS
        .map((key) =>
            options.find((option) => option.key === key)
        )
        .filter(Boolean);

    if (orderedOptions.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 w-full space-y-3">
            {orderedOptions.map((option) => {
                const isSelected =
                    selectedOption === option.key;

                return (
                    <label
                        key={`${questionId}-${option.key}`}
                        className={`
                            flex w-full min-w-0
                            cursor-pointer items-start gap-3
                            rounded-xl border p-3.5
                            transition
                            sm:p-4
                            ${
                                isSelected
                                    ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
                                    : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                            }
                        `}
                    >
                        <input
                            type="radio"
                            name={`question-${questionId}`}
                            value={option.key}
                            checked={isSelected}
                            onChange={() =>
                                onSelectOption(option.key)
                            }
                            className="mt-1 h-4 w-4 shrink-0"
                        />

                        <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
                            <span className="shrink-0 font-semibold text-gray-900 dark:text-white">
                                {option.key}.
                            </span>

                            <span
                                className="
                                    min-w-0 flex-1
                                    break-words
                                    [overflow-wrap:anywhere]
                                    text-sm leading-6
                                    text-gray-700
                                    dark:text-gray-300
                                "
                            >
                                {option.value}
                            </span>
                        </div>
                    </label>
                );
            })}
        </div>
    );
};

export default QuizOptions;