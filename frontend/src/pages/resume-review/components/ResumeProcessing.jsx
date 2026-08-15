import { FileText, Loader2 } from "lucide-react";

const ResumeProcessing = ({ fileName = "Your resume" }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex min-h-64 flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/40">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600 dark:text-purple-400" />
        </div>

        <h2 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">
          Analyzing your resume
        </h2>

        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Our AI is reviewing your resume and preparing personalized
          feedback. This may take a few moments.
        </p>

        <div className="mt-6 flex max-w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
          <FileText className="h-5 w-5 shrink-0 text-purple-600 dark:text-purple-400" />

          <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
            {fileName}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
          Extracting resume content and generating insights...
        </div>
      </div>
    </section>
  );
};

export default ResumeProcessing;