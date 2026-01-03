import type { ApiAxiosError } from "../types/axios-error";

export function getApiErrorMessage(apiError: ApiAxiosError): string {
  const data = apiError.response?.data;


  const errors = data?.errors;

  // 1. errors is a string
  if (typeof errors === "string") {
    return errors;
  }

  // 2. Validation errors with field names
  if (errors && typeof errors === "object") {
    const messages = Object.entries(errors)
      .map(([field, fieldErrors]) => {
        if (!Array.isArray(fieldErrors)) return null;
        return `${field}: ${fieldErrors.join(", ")}`;
      })
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" | ");
    }
  }

  // 3. fallback
  return "Registration failed.";
}
