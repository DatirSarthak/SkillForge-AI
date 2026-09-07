import PropTypes from "prop-types";
import { CheckCircle2, Map } from "lucide-react";

const RoadmapAnalytics = ({ data = {} }) => {
  const progress = Math.min(
    Math.max(Number(data.progressPercentage ?? 0), 0),
    100
  );

  const lastCompleted = data.lastCompletedAt
    ? new Date(data.lastCompletedAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "No completed steps yet";

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400">
            <Map size={18} />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Roadmap Progress
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          See how far you have progressed through your learning roadmaps.
        </p>
      </div>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Overall progress
          </p>

          <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {progress.toFixed(1)}%
          </p>
        </div>

        <CheckCircle2
          size={30}
          className="text-primary"
        />
      </div>

      <div
        className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Metric
          label="Roadmaps"
          value={data.totalRoadmaps}
        />

        <Metric
          label="Total Steps"
          value={data.totalSteps}
        />

        <Metric
          label="Completed"
          value={data.completedSteps}
        />

        <Metric
          label="Last Completion"
          value={lastCompleted}
        />
      </div>
    </section>
  );
};

const Metric = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
    <p className="text-xs text-gray-500 dark:text-gray-400">
      {label}
    </p>

    <p className="mt-1 truncate text-sm font-semibold text-gray-900 dark:text-white">
      {typeof value === "number"
        ? value.toLocaleString("en-IN")
        : value}
    </p>
  </div>
);

RoadmapAnalytics.propTypes = {
  data: PropTypes.object,
};

Metric.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default RoadmapAnalytics;