import { Login } from "@/pages/Login";

export const AuthRoutes = [
  {
    path: "*",
    element: <Login />,
  },
  {
    path: "/",
    element: <Login />,
  },
];
