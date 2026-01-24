import axios, { AxiosError } from "axios";
import { env } from "../../config/env";
import type { ApiResponse } from "../types/api-response";
import { tokenManager } from "../../features/auth/services/token-manager";

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl ?? "https://localhost:5001",
});

/* Attach access token */
httpClient.interceptors.request.use(config => {
  const token = tokenManager.getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* Handle 401 */
httpClient.interceptors.response.use(
  res => res,
  (error: AxiosError<ApiResponse<unknown>>) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";

    if (status === 401 && !url.includes("/Account/refreshtoken")) {
      return tokenManager.handle401(error, httpClient);
    }

    return Promise.reject(error);
  }
);
