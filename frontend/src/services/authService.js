import api from "./api";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);

  if (data.success && data.data) {
    const authData = data.data;

    if (authData.accessToken) {
      localStorage.setItem("accessToken", authData.accessToken);
    }

    if (authData.refreshToken) {
      localStorage.setItem("refreshToken", authData.refreshToken);
    }

    if (authData.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(authData.user)
      );
    }
  }

  return data;
};

export const register = async (userData) => {
  const { data } = await api.post(
    "/auth/register",
    userData
  );

  if (data.success && data.data) {
    const authData = data.data;

    if (authData.accessToken) {
      localStorage.setItem("accessToken", authData.accessToken);
    }

    if (authData.refreshToken) {
      localStorage.setItem("refreshToken", authData.refreshToken);
    }

    if (authData.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(authData.user)
      );
    }
  }

  return data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    if (refreshToken) {
      await api.post("/auth/logout", {
        refreshToken,
      });
    }
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};