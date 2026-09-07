import PropTypes from "prop-types";
import { FileSearch, Award } from "lucide-react";

const ResumeAnalytics = ({ data = {} }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
            <FileSearch size={18} />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Resume Reviews
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Track your ATS performance across resume reviews.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Metric
          label="Total Reviews"
          value={data.totalReviews}
        />

        <Metric
          label="Average ATS"
          value={`${Number(data.averageAtsScore ?? 0).toFixed(1)}%`}
        />

        <Metric
          label="Best ATS"
          value={`${Number(data.bestAtsScore ?? 0).toFixed(1)}%`}
          icon={Award}
        />
      </div>
    </section>
  );
};

const Metric = ({ label, value, icon: Icon }) => (
  <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
    {Icon && (
      <Icon
        size={17}
        className="mb-2 text-gray-400"
      />
    )}

    <p className="text-xs text-gray-500 dark:text-gray-400">
      {label}
    </p>

    <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
      {typeof value === "number"
        ? value.toLocaleString("en-IN")
        : value}
    </p>
  </div>
);

ResumeAnalytics.propTypes = {
  data: PropTypes.object,
};

Metric.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  icon: PropTypes.elementType,
};

export default ResumeAnalytics;