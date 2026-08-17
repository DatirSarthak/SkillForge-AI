import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import RoadmapTimeline from "./components/RoadmapTimeline";
import RoadmapSkeleton from "./components/RoadmapSkeleton";
import useAiRoadmap from "../../hooks/useAiRoadmap";

const RoadmapDetailsPage = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();

  const {
    roadmap,
    detailsLoading,
    error,
    getRoadmap,
  } = useAiRoadmap();

  useEffect(() => {
    if (!roadmapId) {
      return;
    }

    getRoadmap(roadmapId).catch(() => {});
  }, [roadmapId, getRoadmap]);

  const handleBack = () => {
    navigate("/ai-roadmap");
  };

  if (detailsLoading) {
    return (
      <div className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <RoadmapSkeleton />
        </div>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="min-h-full bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl dark:bg-red-500/10">
            ⚠️
          </div>

          <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
            Roadmap not found
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {error ||
              "The roadmap may have been deleted or is no longer available."}
          </p>

          <button
            type="button"
            onClick={handleBack}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Roadmaps
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = roadmap.createdAt
    ? new Date(roadmap.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : null;

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <button
          type="button"
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <span aria-hidden="true">←</span>
          Back to Roadmaps
        </button>

        {/* Header */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex flex-col gap-5">
            <div>
              <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                {roadmap.topic}
              </span>

              <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 dark:text-white sm:text-3xl">
                {roadmap.title}
              </h1>

              {roadmap.summary && (
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {roadmap.summary}
                </p>
              )}
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap gap-2">
              {roadmap.experienceLevel && (
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Level: {roadmap.experienceLevel}
                </span>
              )}

              {roadmap.targetRole && (
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Target: {roadmap.targetRole}
                </span>
              )}

              {roadmap.steps?.length > 0 && (
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {roadmap.steps.length} Steps
                </span>
              )}

              {formattedDate && (
                <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  Created {formattedDate}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Goal */}
        {roadmap.goal && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Your Goal
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {roadmap.goal}
            </p>
          </section>
        )}

        {/* Timeline */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Your Learning Path
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Follow these steps progressively to reach your target.
            </p>
          </div>

          <RoadmapTimeline steps={roadmap.steps || []} />
        </section>
      </div>
    </div>
  );
};

export default RoadmapDetailsPage;