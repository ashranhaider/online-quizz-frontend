import { httpClient } from "../../../shared/api/httpClient";

export async function deleteQuestion(questionId: string): Promise<void> {
  await httpClient.delete(`/questions/${questionId}`);
}
