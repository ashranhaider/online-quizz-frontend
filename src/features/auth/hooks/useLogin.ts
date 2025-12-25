import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import type { AuthenticationRequest, AuthenticationResponse } from "../types/login";
import { loginApi } from "../api/login-request";
import { toastService } from "../../../shared/services/toast.service";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import type { ApiResponse } from "../../../shared/types/api-response";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  return useMutation<ApiResponse<AuthenticationResponse>, ApiAxiosError, AuthenticationRequest>({
    mutationFn: loginApi,
    onSuccess: (response) => {
      if (!response.data) {
        toastService.error("Login failed.");
        return;
      }
      setAuth(response.data);
      toastService.success("Login successful");
      navigate("/admin/home", { replace: true });
    },
    onError: (error: ApiAxiosError) => {
      const apiError = error.response?.data;

      const errorMessage =
        typeof apiError?.errors === "string"
          ? apiError.errors
          : "Login failed.";

      toastService.error(errorMessage);
    },
  });
};
