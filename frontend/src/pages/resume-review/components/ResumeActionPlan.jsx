import {
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Target,
} from "lucide-react";

const ResumeActionPlan = ({
  improvements = [],
  recommendations = [],
}) => {
  const hasImprovements = improvements.length > 0;
  const hasRecommendations = recommendations.length > 0;

  if (!hasImprovements && !hasRecommendations) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-purple-200 bg-white shadow-sm dark:border-purple-900/50 dark:bg-slate-900">
      <div className="border-b border-purple-100 bg-purple-50/70 px-6 py-5 dark:border-purple-900/40 dark:bg-purple-950/20">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/40">
            <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recommended Action Plan
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Practical steps to strengthen your resume and improve your
              career readiness.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-2">
        {hasImprovements && (
          <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />

              <h3 className="font-semibold text-slate-900 dark:text-white">
                Priority Improvements
              </h3>
            </div>

            <ol className="mt-5 space-y-4">
              {improvements.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex gap-3"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="pt-0.5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {hasRecommendations && (
          <div className="rounded-xl border border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400" />

              <h3 className="font-semibold text-slate-900 dark:text-white">
                Career Recommendations
              </h3>
            </div>

            <ul className="mt-5 space-y-4">
              {recommendations.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex gap-3"
                >
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-purple-500" />

                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeActionPlan;