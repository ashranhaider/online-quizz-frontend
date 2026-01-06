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
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});



httpClient.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    const token = localStorage.getItem("accessToken");
    
    if (error.response) {
      const { status } = error.response!;
      
      switch (status) {
        case 400:
          console.log(error.response);
          break;
        case 401:
          if (token && isJwtExpired(token)) {

            // token invalid / expired
            window.dispatchEvent(new Event("auth:unauthorized"));
          }
          break;
        case 404:
          console.log(error.response?.status);
          break;
        case 500:
          console.log("server error");
          break;
        default:
          console.log("an unknown error occurred");
          break;
      }
    }
    return Promise.reject(error);
  }
);
function isJwtExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) return true;

    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp <= nowInSeconds;
  } catch {
    return true;
  }
}
