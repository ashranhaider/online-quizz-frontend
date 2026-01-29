import axios from "axios";
import type { ApiResponse } from "../../../shared/types/api-response";
import type { AuthenticationResponse, RefreshTokenRequest } from "../types/auth";
import { env } from "../../../config/env";

export async function refreshTokenApi(payload: RefreshTokenRequest): Promise<ApiResponse<AuthenticationResponse>> {
  const API_BASE_URL = env.apiBaseUrl ?? "https://localhost:5001";
  const response = await axios.post<ApiResponse<AuthenticationResponse>>(API_BASE_URL + "/Account/refreshtoken", payload);
  return response.data;
}