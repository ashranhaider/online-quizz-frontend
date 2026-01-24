import type { AuthenticationResponse } from "../../features/auth/types/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const authStorageService = {
  /**
   * Save authentication data to local storage
   */
  setAuth: (authData: AuthenticationResponse): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
    localStorage.setItem(ACCESS_TOKEN_KEY, authData.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken);
  },

  getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),

  clearAuth: () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
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
   * Retrieve user info from local storage
   */
  getUser: (): any | null => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },
};
