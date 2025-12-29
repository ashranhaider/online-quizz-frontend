import type { ApiAxiosError } from "../types/axios-error";

export function mapFieldErrors(error: ApiAxiosError) {
  const errors = error.response?.data?.errors as Record<string, string[]> | undefined;

  if (!errors) return null;

  const fieldErrors: Record<string, string> = {};

  Object.keys(errors).forEach(key => {
    fieldErrors[key.toLowerCase()] = errors[key][0]; // store first message
  });

  return fieldErrors;
}
