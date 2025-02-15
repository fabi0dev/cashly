import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Login } from "@/pages/Login";
import { PrivateRoutes } from "./PrivateRoutes";

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <PrivateRoute />,
    children: PrivateRoutes,
  },
]);

export default function Routers() {
  return <RouterProvider router={router} />;
}
