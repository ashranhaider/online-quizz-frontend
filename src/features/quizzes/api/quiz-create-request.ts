import { httpClient } from "../../../shared/api/httpClient";
import type { Quiz } from "../types/quiz";

export type CreateQuizRequest = Omit<Quiz, "id">;

export async function createQuiz(payload: CreateQuizRequest): Promise<Quiz> {
  const response = await httpClient.post("/quizzes", payload);
  return response.data;
}
