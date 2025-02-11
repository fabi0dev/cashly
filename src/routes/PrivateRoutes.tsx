import { Categories } from "@/pages/Categories";
import { Dashboard } from "@/pages/Dashboard";
import { Goals } from "@/pages/Goals";
import { Settings } from "@/pages/Settings";
import { Transactions } from "@/pages/Transactions";

export const PrivateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/goals",
    element: <Goals />,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
];
