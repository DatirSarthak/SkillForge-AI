import {
  RefreshCw,
  UserCheck,
  UserX,
  ShieldAlert,
} from "lucide-react";
import AdminStatsGrid from "../../components/admin/AdminStatsGrid";
import { useAdminDashboard } from "../../hooks/useAdmin";

const AdminDashboardPage = () => {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAdminDashboard();

  const handleRefresh = async () => {
    await refetch();
  };

  if (isLoading) return <DashboardSkeleton />;

  if (isError) {
    return (
      <State
        title="Unable to load admin dashboard"
        action={refetch}
      />
    );
  }

  if (!data) {
    return <State title="No dashboard data available" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">
            Overview
          </p>

          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor users and platform activity from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={isFetching}
          className="
            inline-flex items-center justify-center gap-2
            rounded-xl
            border border-slate-200
            bg-white
            px-4 py-2.5
            text-sm font-semibold
            text-slate-800
            shadow-sm
            transition
            hover:bg-slate-50
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-100
            dark:hover:bg-slate-800
          "
        >
          <RefreshCw
            size={16}
            className={isFetching ? "animate-spin" : ""}
          />

          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Statistics */}
      <AdminStatsGrid data={data} />

      {/* Bottom sections */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Account Health */}
        <div
          className="
            rounded-2xl
            border border-slate-200
            bg-white
            p-5
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <h2 className="font-semibold">
            Account health
          </h2>

          <div className="mt-5 space-y-4">
            <Metric
              icon={UserCheck}
              label="Active"
              value={data.activeUsers}
            />

            <Metric
              icon={UserX}
              label="Inactive"
              value={data.inactiveUsers}
            />

            <Metric
              icon={ShieldAlert}
              label="Locked"
              value={data.lockedUsers}
            />
          </div>
        </div>

        {/* Recent Users */}
        <div
          className="
            rounded-2xl
            border border-slate-200
            bg-white
            p-5
            xl:col-span-2
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">
              Recent users
            </h2>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Latest registrations
            </span>
          </div>

          <div
            className="
              mt-4
              divide-y
              divide-slate-100
              dark:divide-slate-800
            "
          >
            {(data.recentUsers ?? []).map((user) => (
              <div
                key={user.id}
                className="
                  flex items-center
                  justify-between
                  gap-3
                  py-3
                "
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </p>

                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">
                  {user.createdAt
                    ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                    : "—"}
                </span>
              </div>
            ))}

            {!data.recentUsers?.length && (
              <p className="py-8 text-center text-sm text-slate-500">
                No recent users.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Metric = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Icon
        size={18}
        className="text-primary"
      />

      <span className="text-sm">
        {label}
      </span>
    </div>

    <strong>{value ?? 0}</strong>
  </div>
);

const State = ({ title, action }) => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="text-center">
      <h1 className="text-lg font-semibold">
        {title}
      </h1>

      {action && (
        <button
          type="button"
          onClick={() => action()}
          className="
            mt-4
            rounded-xl
            bg-slate-900
            px-4 py-2
            text-sm font-semibold
            text-white
            transition
            hover:bg-slate-800
            dark:bg-white
            dark:text-slate-900
            dark:hover:bg-slate-200
          "
        >
          Try again
        </button>
      )}
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-20 w-72 rounded-xl bg-slate-200 dark:bg-slate-800" />

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800"
        />
      ))}
    </div>
  </div>
);

export default AdminDashboardPage;
