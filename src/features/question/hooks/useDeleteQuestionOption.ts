import { useMutation } from "@tanstack/react-query";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import { deleteQuestionOption } from "../api/question-option-delete-request";

export const useDeleteQuestionOption = () => {
  return useMutation<void, ApiAxiosError, number>({
    mutationFn: deleteQuestionOption,
  });
};
