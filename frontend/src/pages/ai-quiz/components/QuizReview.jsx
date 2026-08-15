import PropTypes from "prop-types";

const QuizReview = ({ questions, answers }) => {
  if (!questions || questions.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No questions available for review.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Quiz Review
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Review your answers and the correct answers.
        </p>
      </div>

      {questions.map((question, index) => {
        const selectedAnswer =
          answers?.[question.id] ||
          answers?.find?.(
            (answer) => answer.questionId === question.id
          )?.selectedOption;

        const isCorrect =
          selectedAnswer?.toUpperCase() ===
          question.correctOption?.toUpperCase();

        return (
          <article
            key={question.id}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {index + 1}
              </span>

              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                {question.questionText}
              </h3>
            </div>

            <div className="mt-5 space-y-2">
              {question.options?.map((option) => {
                const selected =
                  selectedAnswer?.toUpperCase() ===
                  option.key?.toUpperCase();

                const correct =
                  question.correctOption?.toUpperCase() ===
                  option.key?.toUpperCase();

                let optionClass =
                  "border-gray-200 dark:border-gray-700";

                if (correct) {
                  optionClass =
                    "border-green-500 bg-green-50 dark:border-green-600 dark:bg-green-950";
                } else if (selected) {
                  optionClass =
                    "border-red-500 bg-red-50 dark:border-red-600 dark:bg-red-950";
                }

                return (
                  <div
                    key={option.key}
                    className={`rounded-lg border p-3 ${optionClass}`}
                  >
                    <div className="flex gap-3">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {option.key}.
                      </span>

                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {option.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your answer:{" "}
                <span className="font-semibold">
                  {selectedAnswer || "Not answered"}
                </span>
              </p>

              <p className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Correct answer:{" "}
                <span className="font-semibold">
                  {question.correctOption}
                </span>
              </p>

              <p
                className={`mt-2 text-sm font-semibold ${
                  isCorrect
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isCorrect ? "Correct" : "Incorrect"}
              </p>

              {question.explanation && (
                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {question.explanation}
                </p>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
};

QuizReview.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      questionText: PropTypes.string.isRequired,
      correctOption: PropTypes.string,
      explanation: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  answers: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

QuizReview.defaultProps = {
  questions: [],
  answers: {},
};

export default QuizReview;