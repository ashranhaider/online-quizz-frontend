
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import AdminHome from "../../features/admin/pages/Home";
import type { RouteObject } from "react-router-dom";

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
      { path: "home", element: <AdminHome /> }, // /admin/home
    ],
  },
];
