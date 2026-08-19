import api from "./api";

const BASE_URL = "/notifications";

const getNotifications = async (limit = 20) => {
  const response = await api.get(BASE_URL, {
    params: { limit },
  });

  return response.data;
};

const getUnreadCount = async () => {
  const response = await api.get(`${BASE_URL}/unread-count`);
  return response.data;
};

const markAsRead = async (notificationId) => {
  const response = await api.patch(`${BASE_URL}/${notificationId}/read`);
  return response.data;
};

const markAllAsRead = async () => {
  const response = await api.patch(`${BASE_URL}/read-all`);
  return response.data;
};

const deleteNotification = async (notificationId) => {
  const response = await api.delete(`${BASE_URL}/${notificationId}`);
  return response.data;
};

const notificationService = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};

export default notificationService;
