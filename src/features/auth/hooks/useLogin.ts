import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import type { AuthenticationRequest, AuthenticationResponse } from "../types/login";
import { loginApi } from "../api/login-request";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  return useMutation<AuthenticationResponse, Error, AuthenticationRequest>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (!data.token) {
        // No token = treat as failed even if 200
        return;
      }
      setAuth(data);
      navigate("/admin/home", { replace: true });
    },
  });
};
