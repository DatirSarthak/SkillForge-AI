const RoadmapProgressCard = ({ progress, loading = false, onResume }) => {
  if (loading) {
    return (
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-56 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      </section>
    );
  }

  if (!progress) {
    return null;
  }

  const percentage = Number(progress.progressPercentage || 0);
  const completed = progress.completedSteps || 0;
  const total = progress.totalSteps || 0;

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Your Progress
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {completed} of {total} learning steps completed
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {percentage.toFixed(0)}%
          </p>
          <p className="text-xs font-medium text-slate-400">
            {percentage >= 100 ? "Roadmap completed" : "Overall completion"}
          </p>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500 dark:bg-indigo-500"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>

      {progress.nextStepId && (
        <div className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span>Continue with step {progress.nextStepOrder} to keep learning.</span>
            <button
              type="button"
              onClick={() => onResume?.(progress.nextStepId)}
              className="w-fit rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}

      {!progress.nextStepId && total > 0 && (
        <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          You completed every step in this roadmap. Great work!
        </div>
      )}
    </section>
  );
};

export default RoadmapProgressCard;
