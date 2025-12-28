import { useRoutes } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { QuizRoutes } from "./QuizRoutes";

import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import LandingPage from "../../pages/LandingPage";
import ForgotPassword from "../../pages/auth/forgot-password";
import NotFound from "../../pages/errors/NotFound";
import ServerError from "../../pages/errors/ServerError";

export default function AppRoutes() {
  return useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/error", element: <ServerError /> },

    ...AdminRoutes,
    ...QuizRoutes,

    { path: "*", element: <NotFound /> }
  ]);
}
