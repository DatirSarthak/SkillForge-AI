const difficultyStyles = {
  BEGINNER:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",

  INTERMEDIATE:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",

  ADVANCED:
    "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const RoadmapStep = ({ step, completed = false, updating = false, onToggle }) => {
  const difficulty = step?.difficulty?.toUpperCase();

  const difficultyClass =
    difficultyStyles[difficulty] ||
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

  return (
    <article id={`roadmap-step-${step.id}`} className="relative pl-12 scroll-mt-24">
      <div
        className={`absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white text-sm font-bold text-white shadow-sm dark:border-slate-950 ${
          completed ? "bg-emerald-600" : "bg-indigo-600"
        }`}
      >
        {completed ? "✓" : step.stepOrder}
      </div>

      <div
        className={`rounded-2xl border p-5 shadow-sm transition ${
          completed
            ? "border-emerald-200 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-500/5"
            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className={`text-lg font-semibold ${
                  completed
                    ? "text-emerald-800 dark:text-emerald-300"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {step.title}
              </h3>

              {completed && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Completed
                </span>
              )}
            </div>

            {step.estimatedDuration && (
              <p className="mt-1 text-xs text-slate-400">
                Estimated duration: {step.estimatedDuration}
              </p>
            )}
          </div>

          <span
            className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyClass}`}
          >
            {difficulty || "GENERAL"}
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {step.description}
        </p>

        {step.learningObjectives?.length > 0 && (
          <div className="mt-5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Learning Objectives
            </h4>

            <ul className="mt-2 space-y-2">
              {step.learningObjectives.map((objective, index) => (
                <li
                  key={`${step.id}-objective-${index}`}
                  className="flex gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step.subtopics?.length > 0 && (
          <div className="mt-5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
              Subtopics
            </h4>

            <div className="mt-2 flex flex-wrap gap-2">
              {step.subtopics.map((subtopic, index) => (
                <span
                  key={`${step.id}-subtopic-${index}`}
                  className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {subtopic}
                </span>
              ))}
            </div>
          </div>
        )}

        {step.projectSuggestion && (
          <div className="mt-5 rounded-xl bg-indigo-50 p-4 dark:bg-indigo-500/10">
            <h4 className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
              Suggested Project
            </h4>

            <p className="mt-1 text-sm leading-6 text-indigo-600/80 dark:text-indigo-300/80">
              {step.projectSuggestion}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => onToggle?.(step.id, !completed)}
          disabled={updating}
          className={`mt-5 inline-flex min-w-36 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
            completed
              ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {updating
            ? "Saving..."
            : completed
              ? "Mark as Incomplete"
              : "Mark as Complete"}
        </button>
      </div>
    </article>
  );
};

export default RoadmapStep;
