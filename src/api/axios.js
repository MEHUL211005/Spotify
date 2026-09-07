import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add access token to every request
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle expired access token
api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Access token expired
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const response = await axios.post(
          "http://localhost:5000/api/users/refresh-token",
          {
            refreshToken,
          }
        );

        const {
          accessToken,
          refreshToken: newRefreshToken,
        } = response.data.data;

        // Save new rotated tokens
        localStorage.setItem(
          "accessToken",
          accessToken
        );

        localStorage.setItem(
          "refreshToken",
          newRefreshToken
        );

        // Update original request
        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Refresh token failed:",
          refreshError.response?.data ||
            refreshError.message
        );

        // Remove invalid authentication
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;