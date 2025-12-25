import type { AxiosError } from "axios";
import type { ApiResponse } from "./api-response";

export type ApiAxiosError = AxiosError<ApiResponse<unknown>>;
