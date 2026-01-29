export interface Quiz {
  id: string;
  name: string;
  uniqueURL: string;
  isActive: boolean;
}
export interface QuizListRequest {
}
export interface QuizListResponse {
  quizzes: Quiz[];
  total: number;
  page: number;
  pageSize: number;
}