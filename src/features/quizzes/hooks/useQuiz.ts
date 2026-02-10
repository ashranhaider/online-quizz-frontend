import { useQuery } from '@tanstack/react-query'; 
import type {  QuizListResponse } from "../types/quiz";
import { getQuizzes } from "../api/quiz-requests";

export default function useQuizList(){
 
  return useQuery<QuizListResponse, Error>({
    queryKey: ["quizzes"],
    queryFn: () => getQuizzes(),
    placeholderData: (previousData) => previousData,
  });
}