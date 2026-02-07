import { httpClient } from "../../../shared/api/httpClient";
import type { Question } from "../types/question";

export async function getQuestionsByQuizId(
  quizzId: number | string
): Promise<Question[]> {
  const response = await httpClient.get("/questions", {
    params: { quizzId },
  });
  return response.data;
}
