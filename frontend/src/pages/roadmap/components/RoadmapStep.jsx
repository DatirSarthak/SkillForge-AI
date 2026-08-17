const difficultyStyles = {
  BEGINNER:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",

  INTERMEDIATE:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",

  ADVANCED:
    "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const RoadmapStep = ({ step }) => {
  const difficulty = step?.difficulty?.toUpperCase();

  const difficultyClass =
    difficultyStyles[difficulty] ||
    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300";

  return (
    <article className="relative pl-12">
      {/* Step indicator */}
      <div className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-indigo-600 text-sm font-bold text-white shadow-sm dark:border-slate-950">
        {step.stepOrder}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              {step.title}
            </h3>

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

        {/* Description */}
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {step.description}
        </p>

        {/* Learning Objectives */}
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

        {/* Subtopics */}
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

        {/* Project */}
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
      </div>
    </article>
  );
};

export default RoadmapStep;