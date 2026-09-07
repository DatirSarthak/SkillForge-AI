import PropTypes from "prop-types";
import { FileText } from "lucide-react";

const NotesAnalytics = ({ data = {} }) => {
  const types = [
    ["Detailed", data.detailedNotes],
    ["Summary", data.summaryNotes],
    ["Bullet Points", data.bulletPointsNotes],
    ["Interview", data.interviewNotes],
    ["Revision", data.revisionNotes],
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <FileText size={18} />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notes
          </h2>
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Breakdown of the notes you have generated.
        </p>
      </div>

      <div className="mb-5">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Notes
        </p>

        <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
          {Number(data.totalNotes ?? 0).toLocaleString("en-IN")}
        </p>
      </div>

      <div className="space-y-3">
        {types.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50"
          >
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {label}
            </span>

            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {Number(value ?? 0).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

NotesAnalytics.propTypes = {
  data: PropTypes.object,
};

export default NotesAnalytics;