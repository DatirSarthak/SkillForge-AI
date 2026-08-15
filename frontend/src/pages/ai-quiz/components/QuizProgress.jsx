const QuizProgress = ({
  currentQuestion,
  totalQuestions,
}) => {
  if (!totalQuestions) {
    return null;
  }

  const progress = Math.round(
    (currentQuestion / totalQuestions) * 100
  );

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Question {currentQuestion} of {totalQuestions}
        </span>

        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {progress}%
        </span>
      </div>

      <div
        className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-gray-900 transition-all duration-300 dark:bg-white"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default QuizProgress;