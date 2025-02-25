import { AccountsList } from "@/pages/Accounts/AccountsList";
import { Categories } from "@/pages/Categories/CategoriesList";
import { Dashboard } from "@/pages/Dashboard";
import { Expenses } from "@/pages/Expenses";
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
    path: "/expenses",
    element: <Expenses />,
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
