import type { AuthenticationResponse } from "../../features/auth/types/login";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const authStorageService = {
  /**
   * Save authentication data to local storage
   */
  setAuth: (authData: AuthenticationResponse): void => {
    if (!authData.accessToken) return;
    localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
    localStorage.setItem(ACCESS_TOKEN_KEY, authData.accessToken);
  },

  /**
   * Retrieve authentication data from local storage
   */
  getAuth: (): AuthenticationResponse | null => {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (storedUser && storedToken) {
      return {
        user: JSON.parse(storedUser),
        accessToken: storedToken,
      } as AuthenticationResponse;
    }

    return null;
  },

  /**
   * Retrieve access token from local storage
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Retrieve user info from local storage
   */
  getUser: (): any | null => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },

  /**
   * Clear authentication data from local storage
   */
  clearAuth: (): void => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },
};
