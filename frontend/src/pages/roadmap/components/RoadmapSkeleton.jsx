const RoadmapSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="h-7 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />

        <div className="mt-4 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-2 h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />

        <div className="mt-5 flex gap-2">
          <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-7 w-32 rounded-lg bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-4 h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-5 h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />

          <div className="mt-3 flex gap-2">
            <div className="h-7 w-20 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="h-7 w-28 rounded-lg bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapSkeleton;