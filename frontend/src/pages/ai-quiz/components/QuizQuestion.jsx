import QuizOptions from "./QuizOptions";

const QuizQuestion = ({
  question,
  questionNumber,
  selectedOption,
  onSelectOption,
}) => {
  if (!question) {
    return null;
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          Question {questionNumber}
        </p>

        <h2 className="text-lg font-semibold leading-relaxed text-gray-900 dark:text-white sm:text-xl">
          {question.questionText}
        </h2>
      </div>

      <QuizOptions
        options={question.options}
        selectedOption={selectedOption}
        onSelectOption={onSelectOption}
        questionId={question.id}
      />
    </div>
  );
};

export default QuizQuestion;