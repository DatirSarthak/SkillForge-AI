import {
  KeyRound,
  Plus,
  X,
} from "lucide-react";

const ResumeKeywords = ({
  keywords,
}) => {
  const missing =
    keywords?.missing ??
    keywords?.missingKeywords ??
    [];

  const recommended =
    keywords?.recommended ??
    keywords?.recommendedKeywords ??
    [];

  if (!missing.length && !recommended.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/40">
          <KeyRound className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Keyword Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Keywords that can help improve your resume's ATS relevance.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {missing.length > 0 && (
          <div>
            <div className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />

              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Missing Keywords
              </h3>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {missing.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {recommended.length > 0 && (
          <div>
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-purple-500" />

              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Recommended Keywords
              </h3>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {recommended.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 dark:border-purple-900/50 dark:bg-purple-950/30 dark:text-purple-300"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResumeKeywords;