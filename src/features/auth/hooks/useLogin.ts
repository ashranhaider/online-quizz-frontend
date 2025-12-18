import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import type { AuthenticationRequest, AuthenticationResponse } from "../types/login";
import { loginApi } from "../api/login-request";
import { toastService } from "../../../shared/services/toast.service";
import type { ApiAxiosError } from "../../../shared/types/axios-error";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  return useMutation<AuthenticationResponse, ApiAxiosError, AuthenticationRequest>({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (!data.token) {
        // No token = treat as failed even if 200
        toastService.error("Login failed.");
        return;
      }
      setAuth(data);
      toastService.success("Login successful");
      navigate("/admin/home", { replace: true });
    },
    onError: (error: ApiAxiosError) => {
      toastService.error(
        `Login failed. ${error.response?.data?.message ?? error.message}`
      );
    },
  });
};
