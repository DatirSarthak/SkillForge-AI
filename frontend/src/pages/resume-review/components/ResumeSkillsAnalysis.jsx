import {
  Code2,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const ResumeSkillsAnalysis = ({ skills }) => {
  const analysis =
    typeof skills === "string"
      ? skills.trim()
      : "";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300">
          <Code2 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Skills Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            AI analysis of the technical and professional skills
            presented in your resume.
          </p>
        </div>
      </div>

      <div className="mt-6">
        {analysis ? (
          <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-4 sm:p-5 dark:border-purple-900/40 dark:bg-purple-950/20">
            <div className="flex gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400" />

              <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                {analysis}
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
            <Sparkles className="mx-auto h-7 w-7 text-slate-400" />

            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
              No skills analysis available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeSkillsAnalysis;