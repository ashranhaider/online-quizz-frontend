import { httpClient } from "../../../shared/api/httpClient";
import type { QuizListResponse } from "../types/quiz";


export async function getQuizByIdApi(quizId: string) {
  const response = await httpClient.get(`/quizzes/${quizId}`);
  return response.data;
}
export async function getQuizzes(): Promise<QuizListResponse> {
  const response = await httpClient.get(`/quizzes`);
  return response.data;
}