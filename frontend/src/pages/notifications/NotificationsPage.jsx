import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import useNotifications from "../../hooks/useNotifications";

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

const NotificationsPage = () => {
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    loading,
    actionLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      try {
        await markAsRead(notification.id);
      } catch {
        toast.error("Failed to update notification.");
        return;
      }
    }

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      toast.success("Notification deleted.");
    } catch {
      toast.error("Failed to delete notification.");
    }
  };

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Bell size={21} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                  Notifications
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Stay updated with your SkillForge activity.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => markAllAsRead().catch(() => toast.error("Failed to update notifications."))}
            disabled={actionLoading || unreadCount === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {loading ? (
            <div className="space-y-3 p-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-20 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                />
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                <Bell size={24} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                You&apos;re all caught up
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                New learning activity and important updates will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.map((notification) => (
                <article
                  key={notification.id}
                  className={`flex gap-4 p-5 transition ${
                    notification.read
                      ? "bg-white dark:bg-slate-900"
                      : "bg-indigo-50/60 dark:bg-indigo-500/5"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleNotificationClick(notification)}
                    className="flex min-w-0 flex-1 gap-4 text-left"
                  >
                    <span
                      className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                        notification.read
                          ? "bg-slate-300 dark:bg-slate-700"
                          : "bg-indigo-500"
                      }`}
                      aria-hidden="true"
                    />

                    <span className="min-w-0">
                      <span className="block font-semibold text-slate-900 dark:text-white">
                        {notification.title}
                      </span>

                      <span className="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {notification.message}
                      </span>

                      <span className="mt-2 block text-xs text-slate-400 dark:text-slate-500">
                        {formatNotificationDate(notification.createdAt)}
                      </span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(notification.id)}
                    disabled={actionLoading}
                    className="h-fit rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                    aria-label="Delete notification"
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
