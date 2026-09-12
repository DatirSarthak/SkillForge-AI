import { History } from "lucide-react";

import ResumeReviewCard from "./ResumeReviewCard";

const ResumeReviewHistory = ({
  reviews = [],
  onSelect,
}) => {
  if (!reviews.length) {
    return (
      <section
        className="
          rounded-2xl
          border
          border-dashed
          border-slate-300
          bg-white
          p-6
          text-center
          dark:border-slate-700
          dark:bg-slate-900
          sm:p-8
        "
      >
        <div
          className="
            mx-auto
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            dark:bg-slate-800
          "
        >
          <History className="h-5 w-5 text-slate-500" />
        </div>

        <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
          No previous reviews
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
          Upload your resume to generate your first
          AI-powered resume review.
        </p>
      </section>
    );
  }

  return (
    <section>
      {/* Header */}
      <div className="mb-4 flex items-end justify-between gap-3 sm:mb-5">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Previous Reviews
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400 sm:text-sm">
            View your previously analyzed resumes.
          </p>
        </div>

        <div
          className="
            hidden
            shrink-0
            rounded-full
            bg-purple-50
            px-3
            py-1.5
            text-xs
            font-medium
            text-purple-700
            dark:bg-purple-950/40
            dark:text-purple-300
            sm:block
          "
        >
          {reviews.length}{" "}
          {reviews.length === 1 ? "Review" : "Reviews"}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
        {reviews.map((review) => (
          <ResumeReviewCard
            key={review.id}
            review={review}
            onClick={onSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default ResumeReviewHistory;