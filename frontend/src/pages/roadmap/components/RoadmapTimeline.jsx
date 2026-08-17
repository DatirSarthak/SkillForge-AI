import RoadmapStep from "./RoadmapStep";

const RoadmapTimeline = ({
  steps = [],
  progressByStepId = {},
  updatingStepId = null,
  onToggleProgress,
}) => {
  if (!steps.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No roadmap steps available.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute bottom-6 left-5 top-6 w-px bg-slate-200 dark:bg-slate-800" />

      <div className="space-y-6">
        {steps.map((step, index) => (
          <RoadmapStep
            key={step.id || `${step.stepOrder}-${index}`}
            step={step}
            completed={Boolean(progressByStepId[step.id]?.completed)}
            updating={updatingStepId === step.id}
            onToggle={onToggleProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
