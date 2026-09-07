import {
  Bot,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

const LearningProgress = ({ statistics }) => {
  const completedQuizzes = statistics?.completedQuizzes ?? 0;
  const generatedNotes = statistics?.generatedNotes ?? 0;
  const aiChats = statistics?.aiChats ?? 0;

  const totalActivity =
    completedQuizzes + generatedNotes + aiChats;

  /*
   * This is an activity overview, not a fake course-progress
   * percentage. The actual Progress module is currently blank,
   * so we intentionally avoid inventing progress data.
   */
  const activities = [
    {
      label: "Quizzes Completed",
      value: completedQuizzes,
      icon: ClipboardCheck,
      iconStyle: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      barStyle: "bg-emerald-500",
    },
    {
      label: "Notes Generated",
      value: generatedNotes,
      icon: FileText,
      iconStyle: "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
      barStyle: "bg-orange-500",
    },
    {
      label: "AI Conversations",
      value: aiChats,
      icon: Bot,
      iconStyle: "bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      barStyle: "bg-violet-500",
    },
  ];

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-colors
        duration-300
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-blue-100
                text-blue-600
                dark:bg-blue-500/10
                dark:text-blue-400
              "
            >
              <TrendingUp size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Learning Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Your SkillForge AI activity at a glance
              </p>
            </div>
          </div>
        </div>

        {/* Total Activity */}
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            dark:border-slate-700
            dark:bg-slate-800/70
          "
        >
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Total Activity
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {totalActivity}
          </p>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {activities.map((activity) => {
          const Icon = activity.icon;

          const percentage =
            totalActivity > 0
              ? Math.round((activity.value / totalActivity) * 100)
              : 0;

          return (
            <div
              key={activity.label}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-5
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-md
                dark:border-slate-700
                dark:bg-slate-800/60
              "
            >
              <div className="flex items-center justify-between gap-3">
                <div
                  className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    ${activity.iconStyle}
                  `}
                >
                  <Icon size={21} />
                </div>

                <CheckCircle2
                  size={18}
                  className="
                    text-slate-300
                    dark:text-slate-600
                  "
                />
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {activity.label}
                </p>

                <div className="mt-1 flex items-end justify-between gap-3">
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {activity.value}
                  </p>

                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {percentage}%
                  </span>
                </div>
              </div>

              {/* Activity bar */}
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${activity.barStyle}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {totalActivity === 0 && (
        <div
          className="
            mt-5
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-slate-50
            p-5
            text-center
            dark:border-slate-700
            dark:bg-slate-800/50
          "
        >
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Start learning to build your activity
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Generate notes, complete quizzes, or chat with AI to see your
            learning activity here.
          </p>
        </div>
      )}
    </section>
  );
};

export default LearningProgress;