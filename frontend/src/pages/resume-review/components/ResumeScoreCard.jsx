import { Gauge, Sparkles } from "lucide-react";

const ResumeScoreCard = ({ score }) => {
  const safeScore = Math.min(
    100,
    Math.max(0, Number(score) || 0)
  );

  const getScoreLabel = () => {
    if (safeScore >= 80) return "Excellent";
    if (safeScore >= 60) return "Good";
    if (safeScore >= 40) return "Needs Improvement";
    return "Needs Work";
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950/40">
              <Gauge className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>

            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Overall ATS Score
            </p>
          </div>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {safeScore}
            </span>

            <span className="text-lg font-medium text-slate-400">
              /100
            </span>
          </div>

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            {getScoreLabel()}
          </div>
        </div>

        <div
          className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-purple-100 sm:mx-0 dark:border-purple-950/60"
          aria-label={`ATS score ${safeScore} out of 100`}
        >
          <div className="text-center">
            <span className="block text-2xl font-bold text-purple-600 dark:text-purple-400">
              {safeScore}
            </span>

            <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Score
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeScoreCard;