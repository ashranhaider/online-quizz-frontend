import type { ApiAxiosError } from "../types/axios-error";

export function getApiErrorMessage(apiError: ApiAxiosError) {
    const message = apiError.response?.data?.message ?? (Array.isArray(apiError.response?.data?.errors) ? apiError.response?.data?.errors.join(", ") : typeof apiError.response?.data?.errors === "string" ? apiError.response?.data?.errors : null) ?? "Registration failed.";
    return message;
}
