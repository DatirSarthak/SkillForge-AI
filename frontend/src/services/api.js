import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers = [];

/**
 * Notify all requests waiting for a new access token.
 */
const notifySubscribers = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

/**
 * Add a request to the refresh queue.
 */
const subscribeToRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

/**
 * Get the current access token.
 */
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

/**
 * Clear authentication data.
 */
export const clearAuthData = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

/**
 * Refresh the access token.
 *
 * This function is shared by Axios requests and
 * streaming fetch requests.
 */
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    clearAuthData();
    throw new Error("Refresh token not available.");
  }

  const response = await api.post("/auth/refresh", {
    refreshToken,
  });

  const refreshData = response.data?.data;
  const newAccessToken = refreshData?.accessToken;

  if (!newAccessToken) {
    throw new Error(
      "Refresh response did not contain an access token."
    );
  }

  localStorage.setItem("accessToken", newAccessToken);

  return newAccessToken;
};

/**
 * Request interceptor.
 */
api.interceptors.request.use(
  (config) => {
    const isAuthRequest =
      config.url?.startsWith("/auth/login") ||
      config.url?.startsWith("/auth/register") ||
      config.url?.startsWith("/auth/refresh");

    if (!isAuthRequest) {
      const accessToken = getAccessToken();

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor.
 *
 * If access token expires:
 * 1. Call refresh endpoint.
 * 2. Store new access token.
 * 3. Retry original request.
 */
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (
      error.response.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.startsWith("/auth/login") ||
      originalRequest.url?.startsWith("/auth/register") ||
      originalRequest.url?.startsWith("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      clearAuthData();

      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeToRefresh((newAccessToken) => {
          if (!newAccessToken) {
            reject(error);
            return;
          }

          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();

      notifySubscribers(newAccessToken);

      originalRequest.headers =
        originalRequest.headers || {};

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);

    } catch (refreshError) {

      clearAuthData();

      notifySubscribers(null);

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;