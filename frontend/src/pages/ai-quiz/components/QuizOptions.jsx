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
        <div className="mt-6 space-y-3">
            {orderedOptions.map((option) => {
                const isSelected =
                    selectedOption === option.key;

                return (
                    <label
                        key={`${questionId}-${option.key}`}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                            isSelected
                                ? "border-gray-900 bg-gray-50 dark:border-white dark:bg-gray-800"
                                : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        }`}
                    >
                        <input
                            type="radio"
                            name={`question-${questionId}`}
                            value={option.key}
                            checked={isSelected}
                            onChange={() =>
                                onSelectOption(option.key)
                            }
                            className="mt-1"
                        />

                        <div className="flex min-w-0 gap-3">
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {option.key}.
                            </span>

                            <span className="text-sm leading-6 text-gray-700 dark:text-gray-300">
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