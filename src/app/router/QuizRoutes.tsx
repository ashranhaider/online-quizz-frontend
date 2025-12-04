import { type RouteObject } from "react-router-dom";
import QuizLayout from "../layout/QuizLayout";

export const QuizRoutes: RouteObject[] = [
  {
    path: "/quiz",
    element: <QuizLayout />,
    children: [
      { path: ":quizId", element: <div>Quiz start page coming soon</div> }
    ],
  },
];
