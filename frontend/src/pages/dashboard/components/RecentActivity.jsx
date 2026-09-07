import { Activity, CheckCircle2 } from "lucide-react";
import ActivityItem from "./ActivityItem";

const RecentActivity = ({ activities = [] }) => {
  return (
    <div
      className="
        mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm
        dark:border-slate-700 dark:bg-slate-900
      "
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your latest learning and AI activity.
          </p>
        </div>

        <Activity
          size={22}
          className="shrink-0 text-indigo-500 dark:text-indigo-400"
          aria-hidden="true"
        />
      </div>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <ActivityItem
              key={`${activity.activityType || "activity"}-${activity.createdAt || index}-${index}`}
              title={activity.title}
              description={activity.description}
              createdAt={activity.createdAt}
              activityType={activity.activityType}
            />
          ))}
        </div>
      ) : (
        <div
          className="
            rounded-2xl border-2 border-dashed border-slate-300 py-12 text-center
            dark:border-slate-700
          "
        >
          <CheckCircle2
            className="mx-auto mb-4 text-slate-400 dark:text-slate-500"
            size={40}
          />
          <p className="font-medium text-slate-600 dark:text-slate-300">
            No recent activity yet.
          </p>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
            Start using SkillForge AI and your activity will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
