import {
  Bell,
  CheckCheck,
  Search,
  User,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <header
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-colors
        dark:border-slate-700
        dark:bg-slate-900
        sm:p-6
      "
    >
      {/* =========================
          TOP NAVIGATION
      ========================== */}
      <div
        className="
          grid
          grid-cols-3
          items-center
          gap-2
          border-b
          border-slate-100
          pb-4
          dark:border-slate-800
          sm:gap-4
          sm:pb-5
        "
      >
        {/* =========================
            LEFT — PROFILE
        ========================== */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-3
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition
              hover:border-indigo-200
              hover:bg-indigo-50
              hover:text-indigo-600
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
              dark:hover:bg-slate-700
              dark:hover:text-indigo-400
              sm:px-4
            "
            aria-label="Open profile"
          >
            <User size={18} />

            <span>Profile</span>
          </button>
        </div>

        {/* =========================
            CENTER — SEARCH
        ========================== */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/search")}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-3
              py-2.5
              text-sm
              font-medium
              text-slate-500
              transition
              hover:border-indigo-300
              hover:bg-white
              hover:text-indigo-600
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:bg-slate-700
              dark:hover:text-indigo-400
              sm:w-full
              sm:max-w-md
              sm:justify-start
              sm:px-4
            "
            aria-label="Open search"
          >
            <Search size={18} className="shrink-0" />

            {/* Desktop search text */}
            <span className="hidden truncate sm:inline">
              Search courses, notes, quizzes...
            </span>

            {/* Desktop label */}
            <span
              className="
                ml-auto
                hidden
                rounded-md
                border
                border-slate-200
                bg-white
                px-2
                py-0.5
                text-[10px]
                text-slate-400
                dark:border-slate-700
                dark:bg-slate-900
                sm:inline
              "
            >
              Search
            </span>
          </button>
        </div>

        {/* =========================
            RIGHT — NOTIFICATIONS
        ========================== */}
        <div className="relative flex justify-end">
          <button
            type="button"
            onClick={() =>
              setNotificationOpen((current) => !current)
            }
            className="
              relative
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              p-2.5
              shadow-sm
              transition
              hover:border-indigo-200
              hover:bg-indigo-50
              hover:text-indigo-600
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-200
              dark:hover:bg-slate-700
              dark:hover:text-indigo-400
              sm:p-3
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
                  shadow-sm
                "
              >
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* =========================
              NOTIFICATION DROPDOWN
          ========================== */}
          {notificationOpen && (
            <div
              className="
                absolute
                right-0
                top-full
                z-50
                mt-3
                w-[min(22rem,calc(100vw-2rem))]
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-100
                  px-4
                  py-3
                  dark:border-slate-800
                "
              >
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
                  disabled={
                    actionLoading || unreadCount === 0
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1
                    text-xs
                    font-semibold
                    text-indigo-600
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                    dark:text-indigo-400
                  "
                >
                  <CheckCheck size={14} />
                  Mark all
                </button>
              </div>

              {/* Empty State */}
              {notifications.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <Bell
                    className="
                      mx-auto
                      text-slate-300
                      dark:text-slate-600
                    "
                    size={24}
                  />

                  <p
                    className="
                      mt-2
                      text-sm
                      font-medium
                      text-slate-700
                      dark:text-slate-300
                    "
                  >
                    No notifications
                  </p>
                </div>
              ) : (
                /* Notification List */
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      onClick={() =>
                        handleNotificationClick(notification)
                      }
                      className={`
                        flex
                        w-full
                        gap-3
                        border-b
                        border-slate-100
                        px-4
                        py-3
                        text-left
                        transition
                        last:border-b-0
                        dark:border-slate-800
                        ${
                          notification.read
                            ? "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                            : "bg-indigo-50/60 hover:bg-indigo-50 dark:bg-indigo-500/5 dark:hover:bg-indigo-500/10"
                        }
                      `}
                    >
                      <span
                        className={`
                          mt-1.5
                          h-2.5
                          w-2.5
                          shrink-0
                          rounded-full
                          ${
                            notification.read
                              ? "bg-slate-300 dark:bg-slate-600"
                              : "bg-indigo-500"
                          }
                        `}
                      />

                      <span className="min-w-0">
                        <span
                          className="
                            block
                            truncate
                            text-sm
                            font-semibold
                            text-slate-900
                            dark:text-white
                          "
                        >
                          {notification.title}
                        </span>

                        <span
                          className="
                            mt-0.5
                            block
                            line-clamp-2
                            text-xs
                            leading-5
                            text-slate-500
                            dark:text-slate-400
                          "
                        >
                          {notification.message}
                        </span>

                        <span
                          className="
                            mt-1
                            block
                            text-[10px]
                            text-slate-400
                            dark:text-slate-500
                          "
                        >
                          {formatNotificationDate(
                            notification.createdAt
                          )}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* View All */}
              <button
                type="button"
                onClick={() => {
                  setNotificationOpen(false);
                  navigate("/notifications");
                }}
                className="
                  w-full
                  border-t
                  border-slate-100
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  text-indigo-600
                  transition
                  hover:bg-slate-50
                  dark:border-slate-800
                  dark:text-indigo-400
                  dark:hover:bg-slate-800
                "
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =========================
          DASHBOARD CONTEXT
      ========================== */}
      <div
        className="
          mt-4
          border-t
          border-slate-100
          pt-4
          dark:border-slate-800
          sm:mt-5
          sm:pt-5
        "
      >
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {greeting}
        </p>

        <h1
          className="
            mt-1
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
            sm:text-3xl
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

          <span>{today}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
