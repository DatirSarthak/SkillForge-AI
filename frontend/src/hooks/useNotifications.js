import { useCallback, useEffect, useState } from "react";
import notificationService from "../services/notificationService";

const POLL_INTERVAL = 30000;

const useNotifications = ({ limit = 20, autoLoad = true } = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await notificationService.getNotifications(limit);
      const data = response?.data || {};

      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);

      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to load notifications.";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [limit]);

  const markAsRead = useCallback(async (notificationId) => {
    if (!notificationId) {
      return;
    }

    setActionLoading(true);
    setError(null);

    try {
      const response = await notificationService.markAsRead(notificationId);
      const updated = response?.data;

      if (updated) {
        const previous = notifications.find(
          (notification) => notification.id === notificationId
        );

        setNotifications((current) =>
          current.map((notification) =>
            notification.id === notificationId
              ? updated
              : notification
          )
        );

        if (previous && !previous.read && updated.read) {
          setUnreadCount((current) => Math.max(0, current - 1));
        }
      }
      return updated;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to mark notification as read.";

      setError(message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [notifications]);

  const markAllAsRead = useCallback(async () => {
    setActionLoading(true);
    setError(null);

    try {
      await notificationService.markAllAsRead();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          read: true,
          readAt: notification.readAt || new Date().toISOString(),
        }))
      );
      setUnreadCount(0);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to mark notifications as read.";

      setError(message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, []);

  const deleteNotification = useCallback(async (notificationId) => {
    if (!notificationId) {
      return;
    }

    setActionLoading(true);
    setError(null);

    try {
      await notificationService.deleteNotification(notificationId);

      const deleted = notifications.find(
        (notification) => notification.id === notificationId
      );

      setNotifications((current) =>
        current.filter((notification) => notification.id !== notificationId)
      );

      if (deleted && !deleted.read) {
        setUnreadCount((count) => Math.max(0, count - 1));
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Failed to delete notification.";

      setError(message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    if (!autoLoad) {
      return undefined;
    }

    getNotifications().catch(() => {});

    const intervalId = window.setInterval(() => {
      getNotifications().catch(() => {});
    }, POLL_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, [autoLoad, getNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    actionLoading,
    error,
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
};

export default useNotifications;
