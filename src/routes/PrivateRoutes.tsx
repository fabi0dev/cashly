import { AccountsList } from "@/pages/Dashboard/Accounts/AccountsList";
import { Categories } from "@/pages/Dashboard/Categories/CategoriesList";
import { Home } from "@/pages/Dashboard/Home";
import { ExpenseDetails } from "@/pages/Dashboard/Expenses/ExpenseDetails";
import { ExpenseList } from "@/pages/Dashboard/Expenses/ExpenseList";
import { Settings } from "@/pages/Dashboard/Settings";
import { Transactions } from "@/pages/Dashboard/Transactions";
import path from "path";
import { About } from "@/pages/Dashboard/About";

export const PrivateRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Home />,
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
  {
    path: "/about",
    element: <About />,
  },
];
