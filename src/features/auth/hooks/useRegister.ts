import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { RegisterRequest, RegisterResponse } from "../types/register";
import { registerApi } from "../api/register-request";
import { toastService } from "../../../shared/services/toast.service";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import type { ApiResponse } from "../../../shared/types/api-response";

export const useRegister = () => {
    const navigate = useNavigate();

    return useMutation<ApiResponse<RegisterResponse>, ApiAxiosError, RegisterRequest>({
        mutationFn: registerApi,
        onSuccess: (response) => {
            if (!response.data) {
                toastService.error("Registration failed.");
                return;
            }
            toastService.success(!response.data.message ? "Registration successful!" : response.data.message);
            navigate("/login", { replace: true });
        },
        onError: (error: ApiAxiosError) => {
            const apiError = error.response?.data;
            const message =
                apiError?.message ??
                (Array.isArray(apiError?.errors) ? apiError.errors.join(", ") : null) ??
                "Registration failed.";

            toastService.error(message);
        },
    });
};
