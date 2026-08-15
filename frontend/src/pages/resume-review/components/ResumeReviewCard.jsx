import {
  ArrowRight,
  CalendarDays,
  FileText,
  Gauge,
} from "lucide-react";

const ResumeReviewCard = ({ review, onClick }) => {
  const score = Math.min(
    100,
    Math.max(0, Number(review?.atsScore) || 0)
  );

  const fileName =
    review?.fileName ||
    review?.originalFileName ||
    "Resume Review";

  const formattedDate = review?.createdAt
    ? new Date(review.createdAt).toLocaleDateString(
        undefined,
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "Recently";

  const getScoreLabel = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Needs Work";
    return "Needs Improvement";
  };

  return (
    <button
      type="button"
      onClick={() => onClick?.(review.id)}
      className="group w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-purple-800"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/40">
          <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            {fileName}
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays className="h-3.5 w-3.5" />
            {formattedDate}
          </div>
        </div>

        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-purple-600" />
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-purple-600 dark:text-purple-400" />

          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            ATS Score
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-purple-700 dark:text-purple-300">
            {score}
          </span>

          <span className="text-xs text-slate-400">
            /100
          </span>

          <span className="hidden rounded-full bg-purple-100 px-2 py-1 text-[10px] font-semibold text-purple-700 sm:inline dark:bg-purple-950/50 dark:text-purple-300">
            {getScoreLabel()}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ResumeReviewCard;