import { CheckCircle2, Sparkles } from "lucide-react";

const ResumeStrengths = ({ strengths = [] }) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/40">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Key Strengths
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            What your resume is already doing well.
          </p>
        </div>
      </div>

      {strengths.length ? (
        <ul className="mt-5 space-y-3">
          {strengths.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5 text-sm leading-6 text-slate-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-slate-300"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
          <Sparkles className="mx-auto h-6 w-6 text-slate-400" />

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            No strengths available.
          </p>
        </div>
      )}
    </section>
  );
};

export default ResumeStrengths;