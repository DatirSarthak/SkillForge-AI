import api from "./api";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);

  console.log("Response:", data);

  if (data.success && data.data?.accessToken) {
    console.log("Saving token...");

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.data.user));

    console.log(
      "Stored Token:",
      localStorage.getItem("accessToken")
    );
  }

  return data;
};

export const register = async (userData) => {
  const { data } = await api.post("/auth/register", userData);

  return data;
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};