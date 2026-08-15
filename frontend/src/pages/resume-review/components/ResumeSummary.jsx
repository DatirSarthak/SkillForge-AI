import {
  FileSearch,
  Sparkles,
} from "lucide-react";

const ResumeSummary = ({ summary }) => {
  const content =
    typeof summary === "string"
      ? summary.trim()
      : "";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
          <FileSearch className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Resume Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A concise AI-generated overview of your resume.
          </p>
        </div>
      </div>

      {content ? (
        <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 dark:border-indigo-900/40 dark:bg-indigo-950/20">
          <div className="flex gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />

            <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
              {content}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
          <FileSearch className="mx-auto h-7 w-7 text-slate-400" />

          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
            No resume summary available
          </p>
        </div>
      )}
    </section>
  );
};

export default ResumeSummary;