import {
  Bell,
  CheckCheck,
  Search,
  User,
  CalendarDays,
  Settings,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useTheme } from "../../../contexts/ThemeContext";
import { useAuth } from "../../../contexts/AuthContext";
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
  const { darkMode, toggleTheme } = useTheme();
  const { signOut } = useAuth();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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
        <div className="relative flex justify-start">
          <button
            type="button"
            onClick={() => setProfileOpen((current) => !current)}
            className="
              group
              inline-flex
              items-center
              gap-2.5
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-3
              py-2
              text-left
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-indigo-200
              hover:shadow-md
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500/30
              dark:border-slate-700
              dark:bg-slate-800
              dark:hover:border-indigo-500/50
              sm:px-3.5
            "
            aria-label="Open account menu"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <span
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-indigo-500
                to-violet-600
                text-sm
                font-bold
                text-white
                shadow-sm
                transition-transform
                duration-200
                group-hover:scale-105
              "
            >
              S
            </span>

            <span className="hidden min-w-0 sm:block">
              <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
                Account
              </span>
              <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                Profile
              </span>
            </span>

            <ChevronDown
              size={16}
              className={`
                text-slate-400
                transition-transform
                duration-200
                dark:text-slate-500
                ${profileOpen ? "rotate-180" : ""}
              `}
            />
          </button>

          {profileOpen && (
            <div
              role="menu"
              aria-label="Account menu"
              className="
                absolute
                left-0
                top-full
                z-50
                mt-3
                w-[min(18rem,calc(100vw-2rem))]
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-2xl
                ring-1
                ring-black/5
                dark:border-slate-700
                dark:bg-slate-900
                dark:ring-white/5
              "
            >
              {/* Account summary */}
              <div
                className="
                  border-b
                  border-slate-100
                  bg-slate-50/80
                  px-4
                  py-4
                  dark:border-slate-800
                  dark:bg-slate-800/60
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-indigo-500
                      to-violet-600
                      text-sm
                      font-bold
                      text-white
                      shadow-md
                    "
                  >
                    S
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      SkillForge Account
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      Manage your account
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                {/* Profile */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/20
                    dark:text-slate-200
                    dark:hover:bg-indigo-500/10
                    dark:hover:text-indigo-400
                  "
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <User size={17} />
                  </span>

                  <span className="flex-1">
                    <span className="block">Profile</span>
                    <span className="mt-0.5 block text-[11px] font-normal text-slate-400 dark:text-slate-500">
                      View your profile
                    </span>
                  </span>
                </button>

                {/* Settings */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/settings");
                  }}
                  className="
                    mt-1
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/20
                    dark:text-slate-200
                    dark:hover:bg-indigo-500/10
                    dark:hover:text-indigo-400
                  "
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Settings size={17} />
                  </span>

                  <span className="flex-1">
                    <span className="block">Settings</span>
                    <span className="mt-0.5 block text-[11px] font-normal text-slate-400 dark:text-slate-500">
                      Manage preferences
                    </span>
                  </span>
                </button>

                {/* Theme */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={toggleTheme}
                  className="
                    mt-1
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-indigo-50
                    hover:text-indigo-600
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/20
                    dark:text-slate-200
                    dark:hover:bg-indigo-500/10
                    dark:hover:text-indigo-400
                  "
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                    {darkMode ? <Sun size={17} /> : <Moon size={17} />}
                  </span>

                  <span className="flex-1">
                    <span className="block">
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </span>
                    <span className="mt-0.5 block text-[11px] font-normal text-slate-400 dark:text-slate-500">
                      {darkMode ? "Switch to light theme" : "Switch to dark theme"}
                    </span>
                  </span>

                  <span
                    className={`
                      relative
                      h-5
                      w-9
                      rounded-full
                      transition-colors
                      ${darkMode ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"}
                    `}
                    aria-hidden="true"
                  >
                    <span
                      className={`
                        absolute
                        top-0.5
                        h-4
                        w-4
                        rounded-full
                        bg-white
                        shadow-sm
                        transition-transform
                        ${darkMode ? "translate-x-4" : "translate-x-0.5"}
                      `}
                    />
                  </span>
                </button>

                <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

                {/* Logout */}
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setProfileOpen(false);
                    signOut();
                    navigate("/login", { replace: true });
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-3
                    text-left
                    text-sm
                    font-semibold
                    text-red-600
                    transition
                    hover:bg-red-50
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-500/20
                    dark:text-red-400
                    dark:hover:bg-red-500/10
                  "
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                    <LogOut size={17} />
                  </span>

                  <span className="flex-1">
                    <span className="block">Logout</span>
                    <span className="mt-0.5 block text-[11px] font-normal text-red-400/80 dark:text-red-400/60">
                      Sign out of SkillForge AI
                    </span>
                  </span>
                </button>
              </div>
            </div>
          )}
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
                        ${notification.read
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
                          ${notification.read
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
