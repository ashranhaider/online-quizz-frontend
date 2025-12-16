import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // ⏳ Wait until auth is initialized
  if (isLoading) {
    return <div>Loading...</div>; // or spinner
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <>{children}</>;
}
