import {
  CheckCircle2,
} from "lucide-react";

import ActivityItem from "./ActivityItem";

const RecentActivity = ({ activities }) => {

  return (

    <div
      className="
      mt-8
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-6
      shadow-sm
      dark:border-slate-700
      dark:bg-slate-900
      "
    >

      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        Recent Activity
      </h2>

      {activities?.length ? (

        <div className="space-y-4">

          {activities.map((activity, index) => (

            <ActivityItem
              key={index}
              title={activity.title}
            />

          ))}

        </div>

      ) : (

        <div
          className="
          rounded-2xl
          border-2
          border-dashed
          border-slate-300
          py-12
          text-center
          dark:border-slate-700
          "
        >

          <CheckCircle2
            className="mx-auto mb-4 text-slate-400"
            size={40}
          />

          <p className="text-slate-500">
            No recent activity available.
          </p>

        </div>

      )}

    </div>

  );

};

export default RecentActivity;