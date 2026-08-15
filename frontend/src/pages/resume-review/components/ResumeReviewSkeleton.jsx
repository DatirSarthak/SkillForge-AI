const ResumeReviewSkeleton = () => {
  return (
    <div
      className="space-y-5"
      aria-busy="true"
      aria-label="Loading resume review"
    >
      <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="h-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />

        <div className="h-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="h-5 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

        <div className="mt-5 space-y-3">
          <div className="h-14 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-14 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          <div className="h-14 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default ResumeReviewSkeleton;