import axios from "axios";
import { env } from "../../config/env";

// Prefer Vite env var, with fallback
const API_BASE_URL = env.apiBaseUrl ?? "https://localhost:5001";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token (if present)
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Optional: basic 401 handler
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      const errorCode = error.response?.data?.code;

      if (errorCode === "AUTH_TOKEN_EXPIRED") {
        window.dispatchEvent(new Event("auth:unauthorized"));
      }
    }

    return Promise.reject(error);
  }
);

