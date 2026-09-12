import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FileSearch } from "lucide-react";

import ResumeUpload from "./components/ResumeUpload";
import ResumeProcessing from "./components/ResumeProcessing";
import ResumeReviewHistory from "./components/ResumeReviewHistory";
import ResumeReviewSkeleton from "./components/ResumeReviewSkeleton";
import ResumeReviewErrorState from "./components/ResumeReviewErrorState";

import {
  useResumeReviews,
  useUploadResume,
} from "../../hooks/useResumeReview";

const ResumeReviewPage = () => {
  const navigate = useNavigate();

  const historyQuery = useResumeReviews();
  const uploadMutation = useUploadResume();

  const handleUpload = async (file) => {
    try {
      const response =
        await uploadMutation.mutateAsync(file);

      const review =
        response?.data ?? response;

      if (!review?.id) {
        throw new Error(
          "Resume review ID was not returned."
        );
      }

      toast.success(
        "Resume reviewed successfully."
      );

      navigate(`/resume-review/${review.id}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to review resume."
      );
    }
  };

  const handleSelectReview = (reviewId) => {
    if (!reviewId) return;

    navigate(`/resume-review/${reviewId}`);
  };

  return (
    <main className="min-h-full w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-start gap-3">
            <div
              className="
                mt-0.5
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-purple-100
                text-purple-600
                dark:bg-purple-950/40
                dark:text-purple-400
              "
            >
              <FileSearch className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400 sm:text-sm">
                AI Career Tool
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                Resume Review
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-[15px]">
                Upload your resume and receive structured
                AI-powered feedback to improve ATS
                compatibility and career impact.
              </p>
            </div>
          </div>
        </header>

        {/* Upload */}
        <ResumeUpload
          onSubmit={handleUpload}
          isUploading={uploadMutation.isPending}
        />

        {/* Processing */}
        {uploadMutation.isPending && (
          <div className="mt-5 sm:mt-6">
            <ResumeProcessing />
          </div>
        )}

        {/* History */}
        <section className="mt-8 sm:mt-10">
          {historyQuery.isLoading ? (
            <ResumeReviewSkeleton />
          ) : historyQuery.isError ? (
            <ResumeReviewErrorState
              message={
                historyQuery.error?.response?.data?.message ||
                "Unable to load your resume reviews."
              }
              onRetry={() => historyQuery.refetch()}
            />
          ) : (
            <ResumeReviewHistory
              reviews={
                historyQuery.data?.data?.content ??
                historyQuery.data?.content ??
                []
              }
              onSelect={handleSelectReview}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default ResumeReviewPage;