import { BarChart3, Sparkles } from "lucide-react";

const AnalyticsHeader = () => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BarChart3 size={22} />
          </div>

          <span className="text-sm font-medium text-primary">
            Performance Analytics
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Your Analytics
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
          Track your learning activity, AI usage, quiz performance,
          resume progress and roadmap completion in one place.
        </p>
      </div>

      <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 sm:flex">
        <Sparkles size={16} className="text-primary" />
        Last 30 days
      </div>
    </div>
  );
};

export default AnalyticsHeader;