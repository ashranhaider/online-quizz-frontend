import { httpClient } from "../../../shared/api/httpClient";
import type { Quiz } from "../types/quiz";

export type EditQuizRequest = {
  id: string;
  name: string;
  uniqueURL: string;
  isActive: boolean;
};

export async function editQuiz(payload: EditQuizRequest): Promise<Quiz> {
  const response = await httpClient.put(`/quizzes`, payload);
  return response.data;
}
