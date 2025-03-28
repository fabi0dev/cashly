import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/Dialog";
import { useTransactionModal } from "./useTransactionModal";
import { DatePicker } from "@/components/DatePicker";
import { formatCurrency } from "@/lib/utils";
import { ControlledSelect } from "@/components/ControlledSelect";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ControlledInputCurrency } from "@/components/ControlledInputCurrency";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    setValue("type", "ENTRY");
  }, [setValue]);

  return (
    <Dialog
      title={!transactionId ? "Nova Entrada" : "Transação"}
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isPreLoadings}
    >
      <form onSubmit={submit} className="space-y-4">
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
              autoFocus
            />
            <div>
              {categoriesData?.filter((item) => item.type == "INCOME")
                .length === 0 && (
                <Link
                  to={"/categories"}
                  className="flex justify-end items-center gap-1 text-xs p-1 text-yellow-600"
                >
                  * Cadastre categorias de entradas
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ControlledInputCurrency
            label="Valor"
            control={control}
            name="amount"
          />

          <div>
            <label className="block text-sm font-medium  mb-1">Data</label>
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
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <Input
            {...register("description")}
            placeholder={
              transactionType === "EXIT" ? "Compras no supermercado" : "Salário"
            }
          />
        </div>

        <div>
          <ControlledSelect
            label="Conta do banco"
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

        <div className="text-xs mt-1 text-right text-foreground/60 space-y-1">
          {accountSelected && (
            <div>
              <span className="font-bold">Saldo atual: </span>{" "}
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
