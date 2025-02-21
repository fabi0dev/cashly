import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/Dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAccountModal } from "./useAccountsModal";
import { CurrencyInput } from "react-currency-mask";
import { cn, formatCurrency } from "@/lib/utils";
import { AccountsTypes, AccountsTypesKey } from "@/constants/AccountsTypes";
import { Checkbox } from "@/components/ui/checkbox";

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
  const { register, setValue, errors, watch, submit, dataAccount, isLoading } =
    useAccountModal({
      accountId,
      onClose,
    });

  const type = watch("type");

  return (
    <Dialog
      title={!accountId ? "Nova Conta do Banco" : "Conta do Banco"}
      open={isOpen}
      onOpenChange={onClose}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <Input
            {...register("name")}
            placeholder="Nubank, Itaú, etc."
            className={cn(
              "w-full px-3 py-2 rounded-lg border border-gray-200",
              errors.name?.message &&
                "border-red-400 focus-visible:ring-red-400"
            )}
            autoFocus
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <Select
            value={watch("type")}
            {...register("type")}
            onValueChange={(value: AccountsTypesKey) => setValue("type", value)}
          >
            <SelectTrigger
              className={cn(errors.type?.message && "border-red-400")}
            >
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(AccountsTypes).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!accountId && (
          <div>
            <label className="block text-sm font-medium mb-1">
              {type === "CREDIT_CARD" ? "Limite atual" : "Saldo atual"}
            </label>
            <CurrencyInput
              value={watch("balance")}
              onChangeValue={(_, value) => {
                setValue("balance", Number(value));
              }}
              InputElement={
                <Input
                  placeholder="0,00"
                  className={cn(errors.balance?.message && "border-red-400")}
                />
              }
              currency={"BRL"}
            />
          </div>
        )}

        {accountId && (
          <div className="text-right text-sm">
            Saldo atual: {formatCurrency(dataAccount?.balance || 0)}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={watch("isDefault")}
            onCheckedChange={(checked) => setValue("isDefault", !!checked)}
          />
          <label htmlFor="remember" className="text-sm cursor-pointer">
            Conta padrão
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
