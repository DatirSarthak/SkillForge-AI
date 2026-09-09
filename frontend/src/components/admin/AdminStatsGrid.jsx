import { Activity, FileText, MessageSquare, Map, ShieldCheck, Users, Brain, FileSearch } from "lucide-react";
import AdminStatCard from "./AdminStatCard";

const AdminStatsGrid = ({ data }) => {
  const cards = [
    ["Total Users", data.totalUsers, "All registered accounts", Users],
    ["Active Users", data.activeUsers, "Currently active", ShieldCheck],
    ["Conversations", data.totalConversations, "AI conversations", MessageSquare],
    ["Messages", data.totalMessages, "Total chat messages", Activity],
    ["Notes", data.totalNotes, "AI-generated notes", FileText],
    ["Quizzes", data.totalQuizzes, "Generated quizzes", Brain],
    ["Resume Reviews", data.totalResumeReviews, "AI resume reviews", FileSearch],
    ["Roadmaps", data.totalRoadmaps, "Learning roadmaps", Map],
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(([label, value, description, icon]) => (
        <AdminStatCard key={label} label={label} value={value} description={description} icon={icon} />
      ))}
    </div>
  );
};

export default AdminStatsGrid;
