import PropTypes from "prop-types";
import { Trophy, Target } from "lucide-react";

const QuizAnalytics = ({ data = {} }) => {
  const difficulties = [
    ["Easy", data.easyQuizzes],
    ["Medium", data.mediumQuizzes],
    ["Hard", data.hardQuizzes],
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Trophy size={18} />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Quiz Performance
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Track your quiz performance and difficulty distribution.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ScoreCard
          label="Average Score"
          value={`${Number(data.averageScore ?? 0).toFixed(1)}%`}
          icon={Target}
        />

        <ScoreCard
          label="Best Score"
          value={`${Number(data.bestScore ?? 0).toFixed(1)}%`}
          icon={Trophy}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {difficulties.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-gray-100 p-3 text-center dark:border-gray-800"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {label}
            </p>

            <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
              {Number(value ?? 0)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <InfoItem
          label="Total Quizzes"
          value={data.totalQuizzes}
        />

        <InfoItem
          label="Total Attempts"
          value={data.totalAttempts}
        />
      </div>
    </section>
  );
};

const ScoreCard = ({ label, value, icon: Icon }) => (
  <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
    <Icon
      size={17}
      className="mb-2 text-gray-400"
    />

    <p className="text-xs text-gray-500 dark:text-gray-400">
      {label}
    </p>

    <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
      {value}
    </p>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {label}
    </p>

    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
      {Number(value ?? 0).toLocaleString("en-IN")}
    </p>
  </div>
);

QuizAnalytics.propTypes = {
  data: PropTypes.object,
};

ScoreCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default QuizAnalytics;