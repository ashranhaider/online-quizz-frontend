import { useMutation } from "@tanstack/react-query";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import {
  editQuestion,
  type EditQuestionRequest,
} from "../api/question-edit-request";

export const useEditQuestion = () => {
  return useMutation<void, ApiAxiosError, EditQuestionRequest>({
    mutationFn: editQuestion,
  });
};
