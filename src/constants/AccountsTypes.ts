export const AccountsTypes = {
  CHECKING: "Conta Corrente",
  SAVINGS: "Poupança",
  CREDIT_CARD: "Cartao de Crédito",
};

export type AccountsTypesKey = keyof typeof AccountsTypes;

export const getAccountTypeLabel = (type: AccountsTypesKey) =>
  AccountsTypes[type];
