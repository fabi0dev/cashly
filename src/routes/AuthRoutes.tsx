import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";

export const AuthRoutes = [
  {
    path: "*",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
