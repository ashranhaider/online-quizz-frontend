import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthenticationResponse } from "../../features/auth/types/login";
import { toastService } from "../../shared/services/toast.service";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  user: AuthenticationResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (authData: AuthenticationResponse) => void;
  logout: () => void;
}
const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";


const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthenticationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = (options?: { silent?: boolean }) => {
    setUser(null);

    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    if (!options?.silent) {
      toastService.success("Logout successful");
    }

    navigate("/login", { replace: true });
  };


  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (storedUser && storedToken) {
      setUser({
        user: JSON.parse(storedUser),
        accessToken: storedToken,
      } as AuthenticationResponse);
    }

    setIsLoading(false);

    const handleUnauthorized = () => {
      logout({ silent: true });
      toastService.error("Session expired. Please log in again.");
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  const setAuth = (authData: AuthenticationResponse) => {
    if (!authData.accessToken) return;

    setUser(authData);

    localStorage.setItem(USER_KEY, JSON.stringify(authData.user));
    localStorage.setItem(ACCESS_TOKEN_KEY, authData.accessToken);
  };
  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user?.accessToken,
    isLoading,
    setAuth,
    logout,
  };
  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
