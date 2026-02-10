export interface QuestionOption {
  id: number;
  optionText: string;
  isCorrect: boolean;
  optionImage?: string;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string | null;
  lastModifiedDate?: string | null;
}

export interface Question {
  id: string;
  quizzId: string;
  questionText: string;
  questionType: QuestionTypes;
  isActive: boolean;
  score: number;
  correctAnswer: string | string[]; // Can be a single answer or multiple answers
  questionOptions?: QuestionOption[];
}

export const QuestionTypes = {
  MultiChoice: 'MultiChoice',
  ShortAnswer: 'ShortAnswer',
  LongAnswer: 'LongAnswer',
  TrueFalse: 'TrueFalse',
} as const;

export type QuestionTypes = typeof QuestionTypes[keyof typeof QuestionTypes];


export interface CreateQuestionRequest {
  questionText: string;
  questionType: QuestionTypes;
  isActive: boolean;
  score: number;
  // questionImage?: Uint8Array;
  quizzId: number;
  questionOptions?: CreateQuestionOptionRequest[] | null;
}

export interface CreateQuestionOptionRequest {
  id?: number;
  optionText: string;
  isCorrect: boolean;
  optionImage?: string;
  questionId?: number;
}
