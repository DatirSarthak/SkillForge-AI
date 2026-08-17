const RoadmapEmptyState = ({
  onCreate,
  title = "No roadmaps yet",
  description = "Create your first personalized AI roadmap and get a clear learning path for your career goal.",
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl dark:bg-indigo-500/10">
        🧭
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      {onCreate && (
        <button
          type="button"
          onClick={onCreate}
          className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          Create Roadmap
        </button>
      )}
    </div>
  );
};

export default RoadmapEmptyState;