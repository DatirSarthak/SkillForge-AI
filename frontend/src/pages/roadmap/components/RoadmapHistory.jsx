import RoadmapCard from "./RoadmapCard";

const RoadmapHistory = ({
  roadmaps = [],
  loading = false,
  onDelete,
}) => {
  if (loading) {
    return (
      <section>
        <div className="mb-5">
          <div className="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="h-5 w-24 rounded bg-slate-200 dark:bg-slate-800" />

              <div className="mt-4 h-6 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />

              <div className="mt-3 h-10 w-full rounded bg-slate-200 dark:bg-slate-800" />

              <div className="mt-5 h-8 w-full rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!roadmaps.length) {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl dark:bg-indigo-500/10">
          🧭
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
          No roadmaps yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Generate your first personalized learning roadmap
          to create a clear path toward your career goal.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Your Roadmaps
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Continue learning from your personalized roadmaps.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {roadmaps.map((roadmap) => (
          <RoadmapCard
            key={roadmap.id}
            roadmap={roadmap}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default RoadmapHistory;