import {
  Bell,
  Moon,
  Sun,
  CalendarDays
} from "lucide-react";

import { useTheme } from "../../../contexts/ThemeContext";
import toast from "react-hot-toast";

const DashboardHeader = () => {

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long"
    }
  );

  const { darkMode, toggleTheme } = useTheme();

  const handleNotification = () => {
    toast("No new notifications");
  };

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";

  else if (hour < 18) greeting = "Good Afternoon";

  return (

    <div
      className="
flex
items-center
justify-between
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

      <div>

        <p
          className="
text-sm
font-medium
text-blue-600
"
        >
          {greeting}
        </p>

        <h1
          className="
mt-1
text-3xl
font-bold
text-slate-900
dark:text-white
"
        >
          Dashboard
        </h1>

        <div
          className="
mt-2
flex
items-center
gap-2
text-sm
text-slate-500
dark:text-slate-400
"
        >
          <CalendarDays size={16} />

          <span>
            {today}
          </span>

        </div>

      </div>

      <div
        className="
flex
items-center
gap-3
"
      >

        <button
    onClick={handleNotification}
    className="
    rounded-xl
    border
    border-slate-200
    bg-white
    p-3
    transition
    hover:bg-slate-100
    dark:border-slate-700
    dark:bg-slate-800
    dark:hover:bg-slate-700
    "
>
    <Bell size={20} />
</button>

        <button
    onClick={toggleTheme}
    className="
    rounded-xl
    border
    border-slate-200
    bg-white
    p-3
    transition
    hover:bg-slate-100
    dark:border-slate-700
    dark:bg-slate-800
    dark:hover:bg-slate-700
    "
>
    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
</button>

      </div>

    </div>

  );

};

export default DashboardHeader;