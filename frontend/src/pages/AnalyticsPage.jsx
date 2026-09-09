import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsOverview from "../components/analytics/AnalyticsOverview";
import ActivityTrend from "../components/analytics/ActivityTrend";
import ChatAnalytics from "../components/analytics/ChatAnalytics";
import NotesAnalytics from "../components/analytics/NotesAnalytics";
import QuizAnalytics from "../components/analytics/QuizAnalytics";
import ResumeAnalytics from "../components/analytics/ResumeAnalytics";
import RoadmapAnalytics from "../components/analytics/RoadmapAnalytics";
import useAnalytics from "../hooks/useAnalytics";

const AnalyticsPage = () => {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useAnalytics();

  /**
   * Backend ApiResponse may contain the actual
   * analytics payload inside `data`.
   */
  const analytics = response?.data ?? response;

  if (isLoading) {
    return <AnalyticsLoading />;
  }

  if (isError) {
    return <AnalyticsError onRetry={refetch} />;
  }

  if (!analytics) {
    return <AnalyticsEmpty />;
  }

  return (
    <main className="w-full pb-8">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <AnalyticsHeader />

        <div className="mt-6 space-y-6">
          {/* Overview */}
          <AnalyticsOverview
            analytics={analytics}
          />

          {/* Activity */}
          <ActivityTrend
            data={analytics.activityTrend ?? []}
          />

          {/* Analytics Breakdown */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ChatAnalytics
              data={analytics.chat ?? {}}
            />

            <NotesAnalytics
              data={analytics.notes ?? {}}
            />

            <QuizAnalytics
              data={analytics.quiz ?? {}}
            />

            <ResumeAnalytics
              data={analytics.resume ?? {}}
            />

            <RoadmapAnalytics
              data={analytics.roadmap ?? {}}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

/* ========================================================= */
/* Loading State */
/* ========================================================= */

const AnalyticsLoading = () => {
  return (
    <main className="w-full pb-8">
      {/* Header Skeleton */}
      <div className="mb-6 animate-pulse">
        <div className="h-5 w-40 rounded-lg bg-gray-200 dark:bg-gray-800" />

        <div className="mt-3 h-9 w-60 rounded-lg bg-gray-200 dark:bg-gray-800" />

        <div className="mt-3 h-4 w-full max-w-2xl rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Overview Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-900"
            />
          )
        )}
      </div>

      {/* Activity Skeleton */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="animate-pulse">
            <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="mt-2 h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="mt-3 h-3 w-64 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="flex gap-3">
            <div className="h-14 w-24 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
            <div className="h-14 w-24 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>

        <div className="mt-6 h-64 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
      </div>

      {/* Breakdown Skeleton */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-900"
            />
          )
        )}
      </div>
    </main>
  );
};

/* ========================================================= */
/* Error State */
/* ========================================================= */

const AnalyticsError = ({ onRetry }) => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-xl font-bold text-red-500">
          !
        </div>

        <h1 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          Unable to load analytics
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Something went wrong while loading
          your analytics. Please try again.
        </p>

        <button
          type="button"
          onClick={() => onRetry()}
          className="
                        mt-5
                        rounded-xl
                        bg-gray-900
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-gray-800
                        focus:outline-none
                        focus:ring-2
                        focus:ring-gray-400
                        dark:bg-white
                        dark:text-gray-900
                        dark:hover:bg-gray-200
                    "
        >
          Try Again
        </button>
      </div>
    </main>
  );
};

/* ========================================================= */
/* Empty State */
/* ========================================================= */

const AnalyticsEmpty = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          —
        </div>

        <h1 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          No analytics available
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Start using SkillForge AI to build
          your analytics.
        </p>
      </div>
    </main>
  );
};

export default AnalyticsPage;