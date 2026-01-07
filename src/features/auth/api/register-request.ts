import { httpClient } from "../../../shared/api/httpClient";
import type { ApiResponse } from "../../../shared/types/api-response";
import type { RegisterRequest, RegisterResponse } from "../types/register";

export async function registerApi(payload: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
  const response = await httpClient.post<ApiResponse<RegisterResponse>>("/Account/register", payload);
  return response.data;
}
