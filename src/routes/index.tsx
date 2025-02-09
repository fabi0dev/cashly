import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";

export default function Routers() {
  return <RouterProvider router={createBrowserRouter(PrivateRoutes)} />;
}
