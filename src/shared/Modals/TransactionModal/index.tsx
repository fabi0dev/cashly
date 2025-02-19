import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CategoryExpenses, CategoryIncomes } from "@/pages/Categories";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/Dialog";
import { useTransactionModal } from "./useTransactionModal";
import { DatePicker } from "@/components/DatePicker";
import { CurrencyInput } from "react-currency-mask";
import { Select } from "@/components/Select";

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
    //isLoadingListAccounts,
  } = useTransactionModal({ onClose });

  const transactionType = watch("type");
  const amount = watch("amount");
  const accountId = watch("accountId");

  return (
    <Dialog title="Nova Transação" open={isOpen} onOpenChange={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue("type", "EXIT")}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              transactionType === "EXIT"
                ? "bg-red-50 border-red-200 text-red-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
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
                ? "bg-green-50 border-green-200 text-green-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Receita</span>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor
            </label>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Conta do banco
          </label>
          <div className="relative">
            <Select
              {...register("category")}
              value={accountId}
              onValueChange={(value) => setValue("category", value)}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <Input
            {...register("description")}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder={
              transactionType === "EXIT" ? "Compras no supermercado" : "Salário"
            }
            autoFocus
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
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
