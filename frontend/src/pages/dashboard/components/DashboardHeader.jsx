import {
  Bell,
  Moon,
  Sun,
  CalendarDays,
  CheckCheck,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useTheme } from "../../../contexts/ThemeContext";
import toast from "react-hot-toast";
import useNotifications from "../../../hooks/useNotifications";

const formatNotificationDate = (date) => {
  if (!date) {
    return "";
  }

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return "";
  }

  return value.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
};

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { darkMode, toggleTheme } = useTheme();

  const {
    notifications,
    unreadCount,
    actionLoading,
    markAsRead,
    markAllAsRead,
  } = useNotifications({ limit: 5 });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        await markAsRead(notification.id);
      } catch {
        toast.error("Failed to update notification.");
        return;
      }
    }

    setNotificationOpen(false);

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast.success("Notifications marked as read.");
    } catch {
      toast.error("Failed to update notifications.");
    }
  };

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
        <p className="text-sm font-medium text-blue-600">
          {greeting}
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <CalendarDays size={16} />
          <span>{today}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">

        {/* Search */}
        <button
          type="button"
          onClick={() => navigate("/search")}
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
          aria-label="Open search"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationOpen((current) => !current)}
            className="
              relative
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
            aria-label="Open notifications"
            aria-expanded={notificationOpen}
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  min-h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-indigo-600
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 z-50 mt-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Notifications
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {unreadCount} unread
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  disabled={actionLoading || unreadCount === 0}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40 dark:text-indigo-400"
                >
                  <CheckCheck size={14} />
                  Mark all
                </button>
              </div>

              {notifications.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <Bell className="mx-auto text-slate-300 dark:text-slate-600" size={24} />
                  <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    No notifications
                  </p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 dark:border-slate-800 ${notification.read
                          ? "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                          : "bg-indigo-50/60 hover:bg-indigo-50 dark:bg-indigo-500/5 dark:hover:bg-indigo-500/10"
                        }`}
                    >
                      <span
                        className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${notification.read
                            ? "bg-slate-300 dark:bg-slate-600"
                            : "bg-indigo-500"
                          }`}
                      />

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                          {notification.title}
                        </span>
                        <span className="mt-0.5 block line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {notification.message}
                        </span>
                        <span className="mt-1 block text-[10px] text-slate-400 dark:text-slate-500">
                          {formatNotificationDate(notification.createdAt)}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setNotificationOpen(false);
                  navigate("/notifications");
                }}
                className="w-full border-t border-slate-100 px-4 py-3 text-center text-sm font-semibold text-indigo-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-indigo-400 dark:hover:bg-slate-800"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
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
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
