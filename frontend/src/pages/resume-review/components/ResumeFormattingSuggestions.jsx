import {
  FilePenLine,
  Sparkles,
} from "lucide-react";

const ResumeFormattingSuggestions = ({
  suggestions = [],
}) => {
  if (!suggestions.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/40">
          <FilePenLine className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Formatting Suggestions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Small presentation improvements that can make your resume more
            polished.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {suggestions.map((suggestion, index) => (
          <div
            key={`${suggestion}-${index}`}
            className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
          >
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />

            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeFormattingSuggestions;