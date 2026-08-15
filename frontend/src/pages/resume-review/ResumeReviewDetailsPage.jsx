import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast";

import {
  useDeleteResumeReview,
  useResumeReview,
} from "../../hooks/useResumeReview";

import ResumeScoreCard from "./components/ResumeScoreCard";
import ResumeSummary from "./components/ResumeSummary";
import ResumeStrengths from "./components/ResumeStrengths";
import ResumeWeaknesses from "./components/ResumeWeaknesses";
import ResumeSkillsAnalysis from "./components/ResumeSkillsAnalysis";
import ResumeExperienceAnalysis from "./components/ResumeExperienceAnalysis";
import ResumeKeywords from "./components/ResumeKeywords";
import ResumeFormattingSuggestions from "./components/ResumeFormattingSuggestions";
import ResumeActionPlan from "./components/ResumeActionPlan";
import ResumeReviewSkeleton from "./components/ResumeReviewSkeleton";
import ResumeReviewErrorState from "./components/ResumeReviewErrorState";

const ResumeReviewDetailsPage = () => {
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const reviewQuery =
    useResumeReview(reviewId);

  const deleteMutation =
    useDeleteResumeReview();

  const response =
    reviewQuery.data?.data ??
    reviewQuery.data;

  const handleDelete = async () => {
    if (!reviewId) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(
        reviewId
      );

      toast.success(
        "Resume review deleted successfully."
      );

      navigate("/resume-review");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to delete resume review."
      );
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteConfirm(false);

    await handleDelete();
  };

  if (reviewQuery.isLoading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ResumeReviewSkeleton />
      </main>
    );
  }

  if (
    reviewQuery.isError ||
    !response
  ) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ResumeReviewErrorState
          message={
            reviewQuery.error?.response
              ?.data?.message ||
            "Unable to load resume review."
          }
          onRetry={() =>
            reviewQuery.refetch()
          }
        />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}

      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() =>
                navigate("/resume-review")
              }
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
            >
              <ArrowLeft className="h-4 w-4" />

              Back to Resume Reviews
            </button>

            <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              AI Career Tool
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Resume Review
            </h1>

            <p className="mt-2 max-w-2xl truncate text-sm text-slate-500 dark:text-slate-400">
              {response.fileName ||
                "Resume"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDeleteClick}
            disabled={
              deleteMutation.isPending
            }
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/20"
          >
            <Trash2 className="h-4 w-4" />

            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete Review"}
          </button>
        </div>
      </header>

      {/* ATS Score */}

      <section className="mb-6">
        <ResumeScoreCard
          score={response.atsScore}
        />
      </section>

      {/* Resume Summary */}

      <section className="mb-6">
        <ResumeSummary
          summary={response.summary}
        />
      </section>

      {/* Strengths + Weaknesses */}

      <section className="mb-6 grid gap-6 lg:grid-cols-2">
        <ResumeStrengths
          strengths={
            response.strengths ?? []
          }
        />

        <ResumeWeaknesses
          weaknesses={
            response.weaknesses ?? []
          }
        />
      </section>

      {/* Skills Analysis */}

      <section className="mb-6">
        <ResumeSkillsAnalysis
          skills={
            response.skillsAnalysis
          }
        />
      </section>

      {/* Experience Analysis */}

      <section className="mb-6">
        <ResumeExperienceAnalysis
          experience={
            response.experienceAnalysis
          }
        />
      </section>

      {/* Education Analysis */}

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Education Analysis
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {response.educationAnalysis ||
            "No education analysis available."}
        </p>
      </section>

      {/* Keywords */}

      <section className="mb-6">
        <ResumeKeywords
          keywords={{
            missing:
              response.missingKeywords ??
              [],
            recommended:
              response.recommendedKeywords ??
              [],
          }}
        />
      </section>

      {/* Formatting Suggestions */}

      <section className="mb-6">
        <ResumeFormattingSuggestions
          suggestions={
            response.formattingSuggestions ??
            []
          }
        />
      </section>

      {/* Action Plan */}

      <section className="mb-6">
        <ResumeActionPlan
          improvements={
            response.actionPlan ?? []
          }
          recommendations={
            response.recommendedKeywords ??
            []
          }
        />
      </section>

      {/* Delete Confirmation */}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Delete Resume Review?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              This review will be permanently
              removed. This action cannot be
              undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={
                  handleCancelDelete
                }
                disabled={
                  deleteMutation.isPending
                }
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleConfirmDelete
                }
                disabled={
                  deleteMutation.isPending
                }
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />

                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ResumeReviewDetailsPage;