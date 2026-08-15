import {
  BriefcaseBusiness,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const ResumeExperienceAnalysis = ({ experience }) => {
  const analysis =
    typeof experience === "string"
      ? experience.trim()
      : "";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
          <BriefcaseBusiness className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Experience Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            AI analysis of your professional experience and career
            progression.
          </p>
        </div>
      </div>

      <div className="mt-6">
        {analysis ? (
          <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5 dark:border-blue-900/40 dark:bg-blue-950/20">
            <div className="flex gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />

              <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                {analysis}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
            <Sparkles className="mx-auto h-7 w-7 text-slate-400" />

            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              No experience analysis available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeExperienceAnalysis;