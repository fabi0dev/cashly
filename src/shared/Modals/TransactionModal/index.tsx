import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/ui/button";
import { ContainerForm } from "@/components/ContainerForm";
import { ControlledSelect } from "@/components/ControlledSelect";
import { ControlledInput } from "@/components/ControlledInput";
import { ControlledDatePicker } from "@/components/ControlledDatePicker";
import { ControlledInputCurrency } from "@/components/ControlledInputCurrency";

import { useTransactionModal } from "./useTransactionModal";
import { formatCurrency } from "@/lib/utils";

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
      <ContainerForm onSubmit={submit}>
        <div className="relative">
          <ControlledSelect
            label="Categoria"
            name="categoryId"
            control={control}
            options={(categoriesData || [])
              .filter((item) =>
                transactionType === "ENTRY"
                  ? item.type === "INCOME"
                  : item.type === "EXPENSE"
              )
              .map((category) => ({
                value: category.id,
                label: category.name,
              }))}
            placeholder="Selecione a categoria"
            autoFocus
          />
          {categoriesData?.filter((item) => item.type === "INCOME").length ===
            0 && (
            <Link
              to="/categories"
              className="flex justify-end items-center gap-1 text-xs p-1 text-yellow-600"
            >
              * Cadastre categorias de entrada
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ControlledInputCurrency
            label="Valor"
            control={control}
            name="amount"
          />
          <ControlledDatePicker label="Data" name="date" control={control} />
        </div>

        <ControlledInput
          label="Descrição"
          name="description"
          control={control}
          placeholder={
            transactionType === "EXIT" ? "Compras no supermercado" : "Salário"
          }
        />

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

        <div className="text-xs mt-1 text-right text-foreground/60 space-y-1">
          {accountSelected && (
            <div>
              <span className="font-bold">Saldo atual: </span>
              {formatCurrency(accountSelected.balance)}
            </div>
          )}

          {!transactionId && accountSelected && (
            <div>
              <span className="font-bold">Saldo pós transação:</span>
              {formatCurrency(
                transactionType === "ENTRY"
                  ? accountSelected.balance + (amount || 0)
                  : accountSelected.balance - (amount || 0)
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoadingMutates}>
            Salvar
          </Button>
        </div>
      </ContainerForm>
    </Dialog>
  );
}
