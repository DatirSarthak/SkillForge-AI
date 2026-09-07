import DashboardHeader from "./components/DashboardHeader";
import WelcomeCard from "./components/WelcomeCard";
import StatisticsCards from "./components/StatisticsCards";
import QuickActions from "./components/QuickActions";
import LearningProgress from "./components/LearningProgress";
import AnalyticsPreview from "./components/AnalyticsPreview";
import useAnalytics from "../../hooks/useAnalytics";

import { useDashboard } from "../../hooks/useDashboard";

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboard();

  const {
    data: analyticsResponse,
    isLoading: analyticsLoading,
    isError: analyticsError,
  } = useAnalytics();

  const analytics =
    analyticsResponse?.data ?? analyticsResponse;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
        <p className="text-xl font-semibold text-slate-900 dark:text-white">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 transition-colors duration-300 dark:bg-slate-950">
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-xl
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  const dashboard = data?.data;

  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            text-center
            shadow-xl
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Dashboard data unavailable
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Please refresh the page and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-slate-100
        transition-colors
        duration-300
        dark:bg-slate-950
      "
    >
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* Dashboard Header */}
        <div className="mb-6 sm:mb-8">
          <DashboardHeader />
        </div>

        {/* Welcome */}
        <WelcomeCard user={dashboard.userSummary} />

        {/* Statistics */}
        <div className="mt-6">
          <StatisticsCards
            statistics={dashboard.statistics}
          />
        </div>

        {/* Learning Overview */}
        <div className="mt-6">
          <LearningProgress
            statistics={dashboard.statistics}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pb-8">
          <QuickActions
            actions={dashboard.quickActions}
          />
        </div>

        {/* Learning Analytics */}
        <div className="mt-6 pb-8">
          <AnalyticsPreview
            analytics={analytics}
            loading={analyticsLoading}
            error={analyticsError}
          />
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;