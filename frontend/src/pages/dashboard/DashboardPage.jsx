import DashboardHeader from "./components/DashboardHeader";
import WelcomeCard from "./components/WelcomeCard";
import StatisticsCards from "./components/StatisticsCards";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";

import { useDashboard } from "../../hooks/useDashboard";

const DashboardPage = () => {

  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
        <p className="text-xl font-semibold text-slate-900 dark:text-white">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (isError) {

    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">

        <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-900">

          <h2 className="text-xl font-bold text-red-600">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            Please refresh the page.
          </p>

        </div>

      </div>

    );

  }

  const dashboard = data?.data;

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

      <div className="mx-auto max-w-7xl p-6">

        <div className="mb-8">
          <DashboardHeader />
        </div>
        <WelcomeCard
          user={dashboard.userSummary}
        />

        <StatisticsCards
          statistics={dashboard.statistics}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">

            <QuickActions
              actions={dashboard.quickActions}
            />

          </div>

          <div>

            <RecentActivity
              activities={dashboard.recentActivities}
            />

          </div>

        </div>

      </div>

    </div>

  );

};

export default DashboardPage;