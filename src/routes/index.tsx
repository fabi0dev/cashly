import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthRoutes } from "./AuthRoutes";

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: PrivateRoutes,
  },
  {
    element: <PublicRoute />,
    children: AuthRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function Routers() {
  return <RouterProvider router={router} />;
}
