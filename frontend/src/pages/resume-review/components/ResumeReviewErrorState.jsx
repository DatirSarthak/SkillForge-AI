import {
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const ResumeReviewErrorState = ({
  message = "Something went wrong while loading your resume review.",
  onRetry,
}) => {
  return (
    <section className="rounded-2xl border border-red-200 bg-red-50/70 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
        <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400" />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
        Unable to load resume review
      </h2>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </section>
  );
};

export default ResumeReviewErrorState;