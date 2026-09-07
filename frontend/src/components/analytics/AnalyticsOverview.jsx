import {
  BrainCircuit,
  FileText,
  GraduationCap,
  Target,
  Map,
} from "lucide-react";

import AnalyticsStatCard from "./AnalyticsStatCard";

const formatNumber = (value) => {
  return new Intl.NumberFormat("en-IN").format(value ?? 0);
};

const AnalyticsOverview = ({ analytics }) => {
  const chat = analytics?.chat ?? {};
  const notes = analytics?.notes ?? {};
  const quiz = analytics?.quiz ?? {};
  const resume = analytics?.resume ?? {};
  const roadmap = analytics?.roadmap ?? {};

  const overviewCards = [
    {
      title: "AI Conversations",
      value: formatNumber(chat.totalConversations),
      subtitle: `${formatNumber(chat.totalMessages)} total messages`,
      icon: BrainCircuit,
      iconClassName: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
      title: "Notes Created",
      value: formatNumber(notes.totalNotes),
      subtitle: "AI generated notes",
      icon: FileText,
      iconClassName: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Quiz Attempts",
      value: formatNumber(quiz.totalAttempts),
      subtitle: `${formatNumber(quiz.totalQuizzes)} quizzes created`,
      icon: GraduationCap,
      iconClassName: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Average ATS Score",
      value: `${Number(resume.averageAtsScore ?? 0).toFixed(1)}%`,
      subtitle: `${formatNumber(resume.totalReviews)} resume reviews`,
      icon: Target,
      iconClassName: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      title: "Roadmap Progress",
      value: `${Number(roadmap.progressPercentage ?? 0).toFixed(1)}%`,
      subtitle: `${formatNumber(roadmap.completedSteps)} steps completed`,
      icon: Map,
      iconClassName: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <section aria-labelledby="analytics-overview">
      <div className="mb-4">
        <h2
          id="analytics-overview"
          className="text-lg font-semibold text-gray-900 dark:text-white"
        >
          Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          A quick snapshot of your learning progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {overviewCards.map((card) => (
          <AnalyticsStatCard
            key={card.title}
            {...card}
          />
        ))}
      </div>
    </section>
  );
};

export default AnalyticsOverview;