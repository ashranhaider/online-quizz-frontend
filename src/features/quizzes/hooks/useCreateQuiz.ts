import { useMutation } from "@tanstack/react-query";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import { createQuiz, type CreateQuizRequest } from "../api/quiz-create-request";
import type { Quiz } from "../types/quiz";

export const useCreateQuiz = () => {
  return useMutation<Quiz, ApiAxiosError, CreateQuizRequest>({
    mutationFn: createQuiz,
  });
};
