import { httpClient } from "../../../shared/api/httpClient";
import type { QuestionTypes } from "../types/question";

export type EditQuestionRequest = {
  id: string;
  questionText: string;
  questionType: QuestionTypes;
  isActive: boolean;
  score: number;
  quizzId: number;
};

export async function editQuestion(
  payload: EditQuestionRequest
): Promise<void> {
  await httpClient.patch("/questions", payload);
}
