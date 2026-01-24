import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthenticationResponse } from "../../features/auth/types/login";
import { toastService } from "../../shared/services/toast.service";
import { authStorageService } from "../../shared/services/auth-storage.service";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  user: AuthenticationResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (authData: AuthenticationResponse) => void;
  logout: () => void;
}


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
    authStorageService.clearAuth();

    if (!options?.silent) {
      toastService.success("Logout successful");
    }

    navigate("/login", { replace: true });
  };


  useEffect(() => {
    const authData = authStorageService.getAuth();

    if (authData) {
      setUser(authData);
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
    authStorageService.setAuth(authData);
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
