import { useMutation } from "@tanstack/react-query";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import { deleteQuestion } from "../api/question-delete-request";

export const useDeleteQuestion = () => {
  return useMutation<void, ApiAxiosError, string>({
    mutationFn: deleteQuestion,
  });
};
