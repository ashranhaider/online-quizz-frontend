import { useQuery } from "@tanstack/react-query";
import { getQuestionsByQuizId } from "../api/question-requests";
import type { Question } from "../types/question";

export const useQuestions = (quizzId?: number | string) => {
  return useQuery<Question[]>({
    queryKey: ["questions", quizzId],
    queryFn: () => getQuestionsByQuizId(quizzId ?? ""),
    enabled: !!quizzId,
  });
};
