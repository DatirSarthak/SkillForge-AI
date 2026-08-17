const RoadmapHeader = ({
  title = "AI Roadmap Generator",
  description = "Create a personalized learning path based on your goals, skills, and career direction.",
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-2xl dark:bg-indigo-500/10">
          🧭
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {title}
          </h1>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHeader;