import { Clock3, CheckCircle2 } from "lucide-react";

const formatActivityDate = (value) => {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
};

const ActivityItem = ({ title, description, createdAt, activityType }) => {
  return (
    <div
      className="
        flex items-start gap-4 rounded-2xl border border-slate-100
        bg-slate-50 p-4 transition-colors
        dark:border-slate-800 dark:bg-slate-800/70
      "
    >
      <CheckCircle2 className="mt-0.5 shrink-0 text-green-500" size={22} />

      <div className="min-w-0">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h4>

        {description && (
          <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}

        <p className="mt-2 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <Clock3 size={13} />
          {formatActivityDate(createdAt)}
          {activityType ? ` · ${activityType}` : ""}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
