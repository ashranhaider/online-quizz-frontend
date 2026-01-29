import { useMutation } from "@tanstack/react-query";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import { editQuiz, type EditQuizRequest } from "../api/quiz-edit-request";
import type { Quiz } from "../types/quiz";

export const useEditQuiz = () => {
  return useMutation<Quiz, ApiAxiosError, EditQuizRequest>({
    mutationFn: editQuiz,
  });
};
