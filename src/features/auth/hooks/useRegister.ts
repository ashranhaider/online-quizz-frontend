import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { RegisterRequest, RegisterResponse } from "../types/register";
import { registerApi } from "../api/register-request";
import { toastService } from "../../../shared/services/toast.service";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import type { ApiResponse } from "../../../shared/types/api-response";
import { getApiErrorMessage } from "../../../shared/utils/getApiErrorMessage";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<ApiResponse<RegisterResponse>, ApiAxiosError, RegisterRequest>({
    mutationFn: registerApi,
    onSuccess: (response) => {
      if (!response.data) {
        toastService.error("Registration failed.");
        return;
      }
      toastService.success(!response.data?.message ? "Registration successful!" : response.data.message);
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toastService.error(getApiErrorMessage(error));
    },
  });
};
