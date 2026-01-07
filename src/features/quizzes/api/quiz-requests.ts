import { httpClient } from "../../../shared/api/httpClient";
import type { QuizListRequest, QuizListResponse } from "../types/quiz";


export async function getQuizByIdApi(quizId: string) {
  const response = await httpClient.get(`/quizzes/${quizId}`);
  return response.data;
}
export async function getQuizzes(payload: QuizListRequest): Promise<QuizListResponse> {
  const response = await httpClient.get(`/quizzes?page=${payload.page}&size=${payload.size}`);
  return response.data;
}