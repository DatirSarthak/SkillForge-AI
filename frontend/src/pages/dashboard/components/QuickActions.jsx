import {
  Bot,
  FileText,
  ClipboardCheck,
  FileSearch,
  Route,
} from "lucide-react";

import ActionCard from "./ActionCard";

const iconMap = {
  "AI Chat": Bot,
  "AI Notes": FileText,
  "AI Quiz": ClipboardCheck,
  "Resume Review": FileSearch,
  Roadmap: Route,
};

const gradientMap = {
  "AI Chat": "from-blue-500 to-indigo-600",
  "AI Notes": "from-green-500 to-emerald-600",
  "AI Quiz": "from-orange-500 to-red-500",
  "Resume Review": "from-pink-500 to-rose-600",
  Roadmap: "from-violet-500 to-purple-600",
};

const QuickActions = ({ actions }) => {

  return (

    <div>

      <h2 className="mb-5 text-2xl font-bold dark:text-white">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {actions?.map((action) => {

          const Icon = iconMap[action.title] || Bot;

          return (
            <ActionCard
              key={action.title}
              title={action.title}
              description={action.description}
              route={action.route}
              icon={<Icon size={24} />}
              color={gradientMap[action.title]}
            />
          );

        })}

      </div>

    </div>

  );

};

export default QuickActions;