import api from "./api";

const BASE_URL = "/users";

const getProfile = async () => {
  const response = await api.get(`${BASE_URL}/profile`);
  return response.data;
};

const updateProfile = async (data) => {
  const response = await api.put(`${BASE_URL}/profile`, data);
  return response.data;
};

const changePassword = async (data) => {
  const response = await api.put(`${BASE_URL}/change-password`, data);
  return response.data;
};

const userService = {
  getProfile,
  updateProfile,
  changePassword,
};

export default userService;