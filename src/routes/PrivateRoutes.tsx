import { AccountsList } from "@/pages/Accounts/AccountsList";
import { Categories } from "@/pages/Categories/CategoriesList";
import { Dashboard } from "@/pages/Dashboard";
import { ExpenseDetails } from "@/pages/Expenses/ExpenseDetails";
import { ExpenseList } from "@/pages/Expenses/ExpenseList";
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
    element: <ExpenseList />,
  },
  {
    path: "/expenses/details/:expenseId",
    element: <ExpenseDetails />,
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
