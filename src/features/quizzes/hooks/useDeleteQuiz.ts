import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import { deleteQuiz } from "../api/quiz-delete-request";

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiAxiosError, string>({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};
