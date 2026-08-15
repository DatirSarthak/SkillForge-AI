import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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

      navigate(
        `/resume-review/${review.id}`
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to review resume."
      );
    }
  };

  const handleSelectReview = (reviewId) => {
    if (!reviewId) {
      return;
    }

    navigate(
      `/resume-review/${reviewId}`
    );
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
          AI Career Tool
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Resume Review
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          Upload your resume and receive structured AI-powered
          feedback to improve ATS compatibility and career impact.
        </p>
      </header>

      <ResumeUpload
        onSubmit={handleUpload}
        isUploading={uploadMutation.isPending}
      />

      {uploadMutation.isPending && (
        <div className="mt-6">
          <ResumeProcessing />
        </div>
      )}

      <section className="mt-10">
        {historyQuery.isLoading ? (
          <ResumeReviewSkeleton />
        ) : historyQuery.isError ? (
          <ResumeReviewErrorState
            message={
              historyQuery.error?.response?.data?.message ||
              "Unable to load your resume reviews."
            }
            onRetry={() =>
              historyQuery.refetch()
            }
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
    </main>
  );
};

export default ResumeReviewPage;