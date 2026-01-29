import { httpClient } from "../../../shared/api/httpClient";

export async function deleteQuiz(quizId: string): Promise<void> {
  await httpClient.delete(`/quizzes/${quizId}`);
}
