import { httpClient } from "../../../shared/api/httpClient";

export async function deleteQuestionOption(id: number): Promise<void> {
  await httpClient.delete(`/Questions/question/QuestionOption/${id}`);
}
