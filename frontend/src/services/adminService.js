import api from "./api";

const unwrap = (response) => response?.data?.data ?? response?.data;

const adminService = {
  getDashboard: async () => {
    const response = await api.get("/admin/dashboard");
    return unwrap(response);
  },

  getUsers: async (params = {}) => {
    const response = await api.get("/admin/users", { params });
    return unwrap(response);
  },

  getUserDetails: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return unwrap(response);
  },

  updateUserStatus: async (userId, accountStatus) => {
    const response = await api.patch(`/admin/users/${userId}/status`, {
      accountStatus,
    });
    return unwrap(response);
  },
};

export default adminService;
