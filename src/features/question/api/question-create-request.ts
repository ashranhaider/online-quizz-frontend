import { httpClient } from "../../../shared/api/httpClient";
import type { CreateQuestionRequest } from "../types/question";

export async function createQuestion(
  payload: CreateQuestionRequest
): Promise<number> {
  const response = await httpClient.post("/questions", payload);
  return response.data;
}
