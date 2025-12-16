import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AuthenticationResponse } from "../../features/auth/types/login";

interface AuthContextValue {
  user: AuthenticationResponse | null;
  token: string | null;
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
  // ✅ States for user and token
  const [user, setUser] = useState<AuthenticationResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as AuthenticationResponse);
    }

    setIsLoading(false);
  }, []);

  const setAuth = (authData: AuthenticationResponse) => {
    if (!authData.token) return;

    setUser(authData);
    setToken(authData.token);

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
    setAuth,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
