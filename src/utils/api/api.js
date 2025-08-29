import axios from "axios";
import { toast } from "sonner";
const API_BASE_URL =import.meta.env.VITE_BACKEND_URL;
console.log("hai for deployment checking ");

const api = axios.create({
  baseURL: API_BASE_URL ,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Error response:", error.response);
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 498 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      console.log("Attempting to refresh token...");

      try {
        await api.post("/auth/refresh-token");
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError.message);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 429) {
      const message =
        error.response?.data?.error || "Too many requests. Try again later.";
      console.warn("Rate Limit Hit:", message);
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
