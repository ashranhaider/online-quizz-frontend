import type { AxiosError } from "axios";
import type { ApiError } from "./api-error";

export type ApiAxiosError = AxiosError<ApiError>;
