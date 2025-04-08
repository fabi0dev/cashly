import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/Dialog";

import { useAccountModal } from "./useAccountsModal";
import { formatCurrency } from "@/lib/utils";
import { AccountsTypes } from "@/constants/AccountsTypes";
import { ControlledInput } from "@/components/ControlledInput";
import { ControlledSelect } from "@/components/ControlledSelect";
import { ControlledInputCurrency } from "@/components/ControlledInputCurrency";
import { ControlledCheckbox } from "@/components/ControlledCheckbox";
import { ContainerForm } from "@/components/ContainerForm";

interface AccountModalProps {
  accountId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({
  accountId,
  isOpen,
  onClose,
}: AccountModalProps) {
  const { formMethods, submit, dataAccount, isLoadingDataAccount, isLoading } =
    useAccountModal({
      accountId,
      onClose,
    });

  const { watch, control } = formMethods;
  const type = watch("type");

  return (
    <Dialog
      title={!accountId ? "Nova Conta do Banco" : "Conta do Banco"}
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isLoadingDataAccount}
    >
      <ContainerForm onSubmit={submit} className="space-y-4">
        <ControlledInput
          control={control}
          name="name"
          label="Nome"
          placeholder="Nubank, Itaú, etc."
          autoFocus
          autoComplete="off"
        />

        <ControlledSelect
          label="Tipo"
          control={control}
          name="type"
          options={Object.entries(AccountsTypes).map(([key, value]) => ({
            label: value,
            value: key,
          }))}
        />

        {!accountId && (
          <ControlledInputCurrency
            name="balance"
            label={type === "CREDIT_CARD" ? "Limite atual" : "Saldo atual"}
            control={control}
            value={watch("balance")}
          />
        )}

        {accountId && (
          <div className="text-right text-sm">
            Saldo atual: {formatCurrency(dataAccount?.balance || 0)}
          </div>
        )}

        <ControlledCheckbox
          label=" Conta padrão"
          name="isDefault"
          control={control}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </ContainerForm>
    </Dialog>
  );
}
