import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { account } from "./account";

export const queries = mergeQueryKeys(account);
