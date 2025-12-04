import { useRoutes } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { QuizRoutes } from "./QuizRoutes";

import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import LandingPage from "../../pages/LandingPage";

export default function AppRoutes() {
  return useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    ...AdminRoutes,
    ...QuizRoutes,

    { path: "*", element: <div>404 Not Found</div> }
  ]);
}
