import { Login } from "@/pages/Authentication/Login";
import { Register } from "@/pages/Authentication/Register";

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
