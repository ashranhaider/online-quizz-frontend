import type { AxiosError, AxiosRequestConfig } from "axios";
import { authStorageService } from "../../../shared/services/auth-storage.service";
import type { ApiResponse } from "../../../shared/types/api-response";
import { refreshTokenApi } from "../api/refresh-token-request";
/**
 * TokenManager
 * ----------------------------------------------------
 * Central authority for:
 * - Access token retrieval
 * - Refresh-token orchestration
 * - Single-flight refresh handling
 * - Retry + forced logout behavior
 *
 * httpClient should delegate all auth lifecycle
 * responsibilities to this class.
 */

type Subscriber = (token: string) => void;

class TokenManager {
  /* ------------------------------------------------------------------
     Refresh state (single-flight control)
  ------------------------------------------------------------------- */

  private isRefreshing = false;
  private subscribers: Subscriber[] = [];

  /* ------------------------------------------------------------------
     Public API
  ------------------------------------------------------------------- */

  /**
   * Returns the current access token (if any)
   * Used by request interceptor to attach Authorization header
   */
  getAccessToken() {
    return authStorageService.getAccessToken();
  }

  /**
   * Handles 401 responses by attempting a refresh flow.
   * If refresh succeeds → retries the original request
   * If refresh fails → forces logout
   */
  async handle401(
    error: AxiosError<ApiResponse<unknown>>,
    retryRequest: (config: AxiosRequestConfig) => Promise<any>
  ) {
    const originalRequest = error.config as any;

    // Invalid request or already retried → force logout
    if (!originalRequest || originalRequest._retry) {
      this.forceLogout();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = authStorageService.getRefreshToken();

    // No refresh token available → force logout
    if (!refreshToken) {
      this.forceLogout();
      return Promise.reject(error);
    }

    /* --------------------------------------------------------------
       If a refresh is already in progress:
       - Queue this request
       - Replay it once a new access token is issued
    --------------------------------------------------------------- */
    if (this.isRefreshing) {
      return new Promise(resolve => {
        this.subscribe(token => {
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(retryRequest(originalRequest));
        });
      });
    }

    /* --------------------------------------------------------------
       Start refresh-token flow (single-flight)
    --------------------------------------------------------------- */
    this.isRefreshing = true;

    try {
      const { data } = await refreshTokenApi({ refreshToken });

      if (!data?.accessToken) {
        throw new Error("Invalid refresh response");
      }

      // Persist new auth state
      authStorageService.setAuth(data);

      // Notify queued requests with new token
      this.notifySubscribers(data.accessToken);

      // Retry original request with new token
      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

      return retryRequest(originalRequest);
    } catch {
      // Refresh failed → clear subscribers and logout
      this.forceLogout();
      return Promise.reject(error);
    } finally {
      this.isRefreshing = false;
    }
  }

  /* ------------------------------------------------------------------
     Subscriber management
  ------------------------------------------------------------------- */

  /**
   * Queue requests while refresh is in progress
   */
  private subscribe(cb: Subscriber) {
    this.subscribers.push(cb);
  }

  /**
   * Replay queued requests once refresh succeeds
   */
  private notifySubscribers(token: string) {
    this.subscribers.forEach(cb => cb(token));
    this.subscribers = [];
  }

  /* ------------------------------------------------------------------
     Logout handling
  ------------------------------------------------------------------- */

  /**
   * Clears pending requests and signals global unauthorized state
   * App-level listeners should react (redirect to login, clear state, etc.)
   */
  private forceLogout() {
    this.subscribers = [];
    window.dispatchEvent(new Event("auth:unauthorized"));
  }
}

export const tokenManager = new TokenManager();