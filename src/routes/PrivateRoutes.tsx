import { AccountsList } from "@/pages/Accounts/AccountsList";
import { Categories } from "@/pages/Categories";
import { Dashboard } from "@/pages/Dashboard";
import { Settings } from "@/pages/Settings";
import { Transactions } from "@/pages/Transactions";

export const PrivateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },

  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/accounts/list",
    element: <AccountsList />,
  },
];
