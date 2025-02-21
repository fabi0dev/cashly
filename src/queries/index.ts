import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { account } from "./account";
import { transaction } from "./transaction";
import { financeOverview } from "./financeOverview";

export const queries = mergeQueryKeys(account, transaction, financeOverview);
