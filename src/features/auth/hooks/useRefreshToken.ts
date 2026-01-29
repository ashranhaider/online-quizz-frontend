import { useMutation } from "@tanstack/react-query";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import type { ApiResponse } from "../../../shared/types/api-response";
import type { AuthenticationResponse, RefreshTokenRequest } from "../types/auth";
import { refreshTokenApi } from "../api/refresh-token-request";

export const useRefreshToken = () => {
  return useMutation<ApiResponse<AuthenticationResponse>, ApiAxiosError, RefreshTokenRequest>({
    mutationFn: refreshTokenApi,
  });
};
