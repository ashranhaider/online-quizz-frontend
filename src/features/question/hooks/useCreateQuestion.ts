import { useMutation } from "@tanstack/react-query";
import type { ApiAxiosError } from "../../../shared/types/axios-error";
import {
  createQuestion,
} from "../api/question-create-request";
import type { CreateQuestionRequest } from "../types/question";

export const useCreateQuestion = () => {
  return useMutation<number, ApiAxiosError, CreateQuestionRequest>({
    mutationFn: createQuestion,
  });
};
