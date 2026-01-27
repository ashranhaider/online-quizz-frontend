import { httpClient } from "../../../shared/api/httpClient";
import type { ApiResponse } from "../../../shared/types/api-response";
import type { AuthenticationResponse, GoogleAuthenticationRequest } from "../types/auth";

export async function googleLoginApi(payload: GoogleAuthenticationRequest): Promise<ApiResponse<AuthenticationResponse>> {

    // Send POST request to "/Account/google" with payload (Google token)
    const response = await httpClient.post<ApiResponse<AuthenticationResponse>>("/Account/google", payload);

    // Return only the actual data from response
    return response.data;
}