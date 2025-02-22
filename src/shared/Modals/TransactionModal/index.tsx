import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/Dialog";
import { useTransactionModal } from "./useTransactionModal";
import { DatePicker } from "@/components/DatePicker";
import { CurrencyInput } from "react-currency-mask";
import { formatCurrency } from "@/lib/utils";
import { ControlledSelect } from "@/components/ControlledSelect";
import { Controller } from "react-hook-form";

interface TransactionModalProps {
  transactionId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionModal({
  transactionId,
  isOpen,
  onClose,
}: TransactionModalProps) {
  const {
    register,
    setValue,
    watch,
    errors,
    submit,
    control,

    isLoadingMutates,
    isPreLoadings,

    listAccounts,
    categoriesData,
  } = useTransactionModal({ transactionId, onClose });

  const transactionType = watch("type");
  const amount = watch("amount");

  const accountId = watch("accountId");
  const accountSelected = listAccounts?.data.find(
    (account) => account.id === accountId
  );

  return (
    <Dialog
      title={!transactionId ? "Nova Transação" : "Transação"}
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isPreLoadings}
    >
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
            <ControlledSelect
              name="categoryId"
              control={control}
              options={(categoriesData || [])
                .filter((item) => {
                  if (transactionType === "ENTRY")
                    return item.type === "INCOME";

                  if (transactionType === "EXIT")
                    return item.type === "EXPENSE";
                })
                .map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              placeholder="Selecione a categoria"
            />
          </div>
          <p className="text-red-500 text-sm">{errors.categoryId?.message}</p>
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
              <Controller
                name={"date"}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    value={field.value ?? ""}
                    onValueChange={(value) => field.onChange(value)}
                    placeholder="Data da transação"
                  />
                )}
              />
            </div>
            <p className="text-red-500 text-sm">{errors.date?.message}</p>
          </div>
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

        <div>
          <label className="block text-sm font-medium  mb-1">
            Conta do banco
          </label>
          <div className="relative">
            <ControlledSelect
              control={control}
              name="accountId"
              options={
                listAccounts?.data.map((account) => ({
                  value: account.id,
                  label: account.name,
                })) || []
              }
            />
          </div>
          <p className="text-red-500 text-sm">{errors.categoryId?.message}</p>
        </div>

        <div className="text-xs mt-1 text-right text-foreground/60 space-y-1">
          {accountSelected && (
            <div>
              <span className="font-bold">Saldo: </span>{" "}
              {formatCurrency(accountSelected.balance)}
            </div>
          )}

          {!transactionId && accountSelected && (
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
          <Button type="submit" isLoading={isLoadingMutates}>
            Salvar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
