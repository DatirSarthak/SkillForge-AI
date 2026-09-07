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
    return (
      <AnalyticsError
        onRetry={refetch}
      />
    );
  }

  if (!analytics) {
    return <AnalyticsEmpty />;
  }

  return (
    <main className="min-h-full">
      <AnalyticsHeader />

      <div className="space-y-6">
        <AnalyticsOverview analytics={analytics} />

        <ActivityTrend
          data={analytics.activityTrend ?? []}
        />

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
    </main>
  );
};

const AnalyticsLoading = () => {
  return (
    <main>
      <div className="mb-8 animate-pulse">
        <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />

        <div className="mt-3 h-8 w-56 rounded bg-gray-200 dark:bg-gray-800" />

        <div className="mt-3 h-4 w-full max-w-2xl rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-900"
          />
        ))}
      </div>

      <div className="mt-6 h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-900" />

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-900"
          />
        ))}
      </div>
    </main>
  );
};

const AnalyticsError = ({ onRetry }) => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md px-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          !
        </div>

        <h1 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          Unable to load analytics
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Something went wrong while loading your analytics.
          Please try again.
        </p>

        <button
          type="button"
          onClick={() => onRetry()}
          className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          Try Again
        </button>
      </div>
    </main>
  );
};

const AnalyticsEmpty = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="px-6 text-center">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          No analytics available
        </h1>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Start using SkillForge AI to build your analytics.
        </p>
      </div>
    </main>
  );
};

export default AnalyticsPage;