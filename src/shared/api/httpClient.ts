import axios, { AxiosError } from "axios";
import { env } from "../../config/env";
import type { ApiResponse } from "../types/api-response";

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
  response => response,
  (error: AxiosError<ApiResponse<unknown>>) => {
    const status = error.response?.status;
    
    // Only treat as unauthorized if token was actually attached
    const hadToken = !!localStorage.getItem("accessToken");
    if (status === 401 && hadToken) {
      // token invalid / expired / revoked / missing
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    if (status === 403) {
      window.dispatchEvent(new Event("auth:forbidden"));
    }

    return Promise.reject(error);
  }
);

