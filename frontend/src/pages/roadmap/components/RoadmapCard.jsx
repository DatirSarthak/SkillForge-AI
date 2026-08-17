import { Link } from "react-router-dom";

const RoadmapCard = ({ roadmap, onDelete }) => {
  if (!roadmap) {
    return null;
  }

  const formattedDate = roadmap.createdAt
    ? new Date(roadmap.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "";

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
            {roadmap.topic}
          </span>

          <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-slate-900 dark:text-white">
            {roadmap.title}
          </h3>
        </div>

        <div className="shrink-0 rounded-xl bg-slate-100 px-3 py-2 text-center dark:bg-slate-800">
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {roadmap.stepCount ?? 0}
          </p>

          <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
            Steps
          </p>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {roadmap.goal}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {roadmap.experienceLevel && (
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {roadmap.experienceLevel}
          </span>
        )}

        {roadmap.targetRole && (
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {roadmap.targetRole}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-xs text-slate-400">
          {formattedDate}
        </span>

        <div className="flex items-center gap-2">
          <Link
            to={`/ai-roadmap/${roadmap.id}`}
            className="rounded-lg px-3 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
          >
            View
          </Link>

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(roadmap)}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default RoadmapCard;