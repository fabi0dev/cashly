export const TransactionsTypes = {
  ENTRY: "Entrada",
  EXIT: "Saída",
};

export type TransactionsTypesKey = keyof typeof TransactionsTypes;

export const getTransactionType = (type: TransactionsTypesKey) =>
  TransactionsTypes[type];
