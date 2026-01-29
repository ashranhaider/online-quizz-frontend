
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import AdminHome from "../../features/admin/pages/Home";
import type { RouteObject } from "react-router-dom";
import Quiz from "../../pages/quiz/quiz";
import CreateQuiz from "../../pages/quiz/create-quiz";
import EditQuiz from "../../pages/quiz/edit-quiz";
import CreateQuestion from "../../pages/question/create-question";

export const AdminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminHome /> },
      { path: "home", element: <AdminHome /> },
      { path: "quiz", element: <Quiz /> },
      { path: "quiz/create-quiz", element: <CreateQuiz /> },
      { path: "quiz/:quizId/edit", element: <EditQuiz /> },
      { path: "quiz/:quizId/questions", element: <CreateQuestion /> },
    ],
  },
];
