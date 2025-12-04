import { type RouteObject } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminHome from "../../features/admin/pages/Home";

export const AdminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "home", element: <AdminHome /> },
    ],
  },
];
