import { useMutation } from "@tanstack/react-query";
import type { RegisterRequest, RegisterResponse } from "../types/register";
import { registerApi } from "../api/register-request";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import type { ApiResponse } from "../../../shared/types/api-response";

export const useRegister = () => {
  return useMutation<ApiResponse<RegisterResponse>, ApiAxiosError, RegisterRequest>({
    mutationFn: registerApi,
  });
};
