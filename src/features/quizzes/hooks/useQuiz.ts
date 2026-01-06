import { useQuery } from '@tanstack/react-query'; 
import type { QuizListRequest, QuizListResponse } from "../types/quiz";
import { getQuizzes } from "../api/quiz-requests";

export default function useQuizList(request: QuizListRequest){
 
  return useQuery<QuizListResponse, Error>({
    queryKey: ["quizzes", request.page, request.size],
    queryFn: () => getQuizzes(request),
    placeholderData: (previousData) => previousData,
  });
}