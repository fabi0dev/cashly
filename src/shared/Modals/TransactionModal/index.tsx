import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CategoryExpenses, CategoryIncomes } from "@/pages/Categories";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/Dialog";
import { useTransactionModal } from "./useTransactionModal";
import { DatePicker } from "@/components/DatePicker";
import { CurrencyInput } from "react-currency-mask";
import { Select } from "@/components/Select";
import { formatCurrency } from "@/lib/utils";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
  const {
    register,
    setValue,
    watch,
    errors,
    submit,
    isLoading,

    listAccounts,
  } = useTransactionModal({ onClose });

  const transactionType = watch("type");
  const amount = watch("amount");

  const accountId = watch("accountId");
  const accountSelected = listAccounts?.data.find(
    (account) => account.id === accountId
  );

  return (
    <Dialog title="Nova Transação" open={isOpen} onOpenChange={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue("type", "EXIT")}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              transactionType === "EXIT"
                ? "bg-red-50 dark:bg-red-800/20 border-red-200 dark:border-red-500/40 text-red-600 dark:text-red-400"
                : "border-gray-200 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            <span className="font-medium">Despesa</span>
          </button>

          <button
            type="button"
            onClick={() => setValue("type", "ENTRY")}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              transactionType === "ENTRY"
                ? "bg-green-50 dark:bg-green-800/20 border-green-500 dark:border-green-500/40 text-green-600 dark:green-red-400"
                : "border-gray-200 dark:border-gray-400 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Receita</span>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <div className="relative">
            <Select
              {...register("category")}
              onValueChange={(value) => setValue("category", value)}
              options={(transactionType === "ENTRY"
                ? CategoryIncomes
                : CategoryExpenses
              ).map((category) => ({
                label: category,
                value: category,
              }))}
              placeholder="Selecione a conta"
            />
          </div>
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Valor</label>

            <CurrencyInput
              value={amount}
              onChangeValue={(_, value) => {
                setValue("amount", Number(value));
              }}
              InputElement={<Input placeholder="0,00" />}
              currency={"BRL"}
            />

            <p className="text-red-500 text-sm">{errors.amount?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">Data</label>
            <div className="relative">
              <DatePicker
                onValueChange={(value) => setValue("date", value)}
                placeholder="Data da transação"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.date?.message}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium  mb-1">
            Conta do banco
          </label>
          <div className="relative">
            <Select
              {...register("accountId")}
              value={accountId}
              onValueChange={(value) => setValue("accountId", value)}
              options={
                listAccounts?.data.map((account) => ({
                  value: account.id,
                  label: account.name,
                })) || []
              }
            />
          </div>
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <Input
            {...register("description")}
            placeholder={
              transactionType === "EXIT" ? "Compras no supermercado" : "Salário"
            }
            autoFocus
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div className="text-xs mt-1 text-right text-foreground/60 space-y-1">
          {accountSelected && (
            <div>
              <span className="font-bold">Saldo atual:</span>{" "}
              {formatCurrency(accountSelected.balance)}
            </div>
          )}

          {accountSelected && (
            <div>
              <span className="font-bold">Saldo pós transação:</span>{" "}
              {transactionType === "ENTRY" &&
                formatCurrency(accountSelected.balance + (amount || 0))}
              {transactionType === "EXIT" &&
                formatCurrency(accountSelected.balance - (amount || 0))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
