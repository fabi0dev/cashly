import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { account } from "./account";
import { transaction } from "./transaction";

export const queries = mergeQueryKeys(account, transaction);
