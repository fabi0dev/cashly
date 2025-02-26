import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { account } from "./account";
import { transaction } from "./transaction";
import { financeOverview } from "./financeOverview";
import { categories } from "./categories";
import { expense } from "./expense";
import { expenseInstallments } from "./expense-installments";

export const queries = mergeQueryKeys(
  account,
  transaction,
  financeOverview,
  categories,
  expense,
  expenseInstallments
);
