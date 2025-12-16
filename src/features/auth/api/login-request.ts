import { httpClient } from "../../../shared/api/httpClient";
import type { AuthenticationRequest, AuthenticationResponse } from "../types/login";

export const loginApi = async (
    payload: AuthenticationRequest
): Promise<AuthenticationResponse> => {
    const response = await httpClient.post<AuthenticationResponse>(
        "/Account/authenticate",
        payload
    );
    return response.data;
};
