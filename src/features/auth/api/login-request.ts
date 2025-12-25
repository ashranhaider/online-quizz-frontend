import { httpClient } from "../../../shared/api/httpClient";
import type { ApiResponse } from "../../../shared/types/api-response";
import type { AuthenticationRequest, AuthenticationResponse } from "../types/login";

export async function loginApi(payload: AuthenticationRequest): Promise<ApiResponse<AuthenticationResponse>> {

    // Send POST request to "/Account/authenticate" with payload (email/password)
    const response = await httpClient.post<ApiResponse<AuthenticationResponse>>("/Account/authenticate", payload);

    // Return only the actual data from response
    return response.data;
}