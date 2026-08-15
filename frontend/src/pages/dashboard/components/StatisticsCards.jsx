import {
  BookOpen,
  ClipboardCheck,
  FileText,
  Bot,
} from "lucide-react";

import StatCard from "./StatCard";

const StatisticsCards = ({ statistics }) => {

  const cards = [
    {
      title: "Completed Courses",
      value: statistics?.completedCourses ?? 0,
      icon: BookOpen,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Completed Quizzes",
      value: statistics?.completedQuizzes ?? 0,
      icon: ClipboardCheck,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Generated Notes",
      value: statistics?.generatedNotes ?? 0,
      icon: FileText,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "AI Chats",
      value: statistics?.aiChats ?? 0,
      icon: Bot,
      color: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
        />
      ))}

    </div>
  );

};

export default StatisticsCards;