export interface Quiz {
  id: string;
  name: string;
  uniqueURL: string;
  isActive: boolean;
}
export interface QuizListRequest {
  page: number;
  size: number;
}
export interface QuizListResponse {
  quizzes: Quiz[];
  total: number;
  page: number;
  pageSize: number;
}