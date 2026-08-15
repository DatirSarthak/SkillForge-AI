import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizService from "../../services/quizService";

const QuizResultPage = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await quizService.getAttempt(attemptId);

        setResult(data.data);
      } catch (err) {
        console.error("Failed to load quiz result:", err);

        setError(
          err?.response?.data?.message ||
          "Failed to load quiz result."
        );
      } finally {
        setLoading(false);
      }
    };

    if (attemptId) {
      fetchResult();
    } else {
      setLoading(false);
      setError("Quiz attempt ID is missing.");
    }
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Loading quiz result...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900 dark:bg-gray-900">
            <p className="text-red-600 dark:text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => navigate("/ai-quiz")}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-400">
              Quiz result is not available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    score = 0,
    totalQuestions = 0,
    percentage = 0,
    answers = [],
  } = result;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Quiz Result
          </p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Your Performance
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here is your performance for this quiz attempt.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">

          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Quiz Completed
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Your Result
            </h2>

            <div className="mt-8">
              <div className="text-5xl font-bold text-gray-900 dark:text-white">
                {percentage}%
              </div>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {score} out of {totalQuestions} correct
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Score
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {score}/{totalQuestions}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Percentage
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
                {percentage}%
              </p>
            </div>
          </div>

          {answers.length > 0 && (
            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Question Review
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Review your answers and see the correct answers with explanations.
                </p>
              </div>

              <div className="space-y-4">
                {answers.map((answer, index) => (
                  <div
                    key={answer.questionId}
                    className={`rounded-xl border p-5 ${answer.correct
                        ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
                        : "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Question {index + 1}
                      </p>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${answer.correct
                            ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                          }`}
                      >
                        {answer.correct ? "Correct" : "Wrong"}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-800 dark:text-gray-200">
                      {answer.questionText}
                    </p>

                    <div className="mt-4 space-y-2 text-sm">
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">
                          Your answer:
                        </span>{" "}
                        {answer.selectedOption}
                      </p>

                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">
                          Correct answer:
                        </span>{" "}
                        {answer.correctOption}
                      </p>
                    </div>

                    {answer.explanation && (
                      <div className="mt-4 rounded-lg bg-white/70 p-3 dark:bg-gray-900/50">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Explanation
                        </p>

                        <p className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300">
                          {answer.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/ai-quiz")}
              className="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;