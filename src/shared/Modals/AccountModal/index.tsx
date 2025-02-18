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
import { cn } from "@/lib/utils";

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
  const { register, setValue, errors, watch, submit, isLoading } =
    useAccountModal({
      accountId,
      onClose,
    });

  return (
    <Dialog
      title={!accountId ? "Nova Conta do Banco" : "Editar Conta do Banco"}
      open={isOpen}
      onOpenChange={onClose}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <Input
            {...register("name")}
            placeholder="Nubank, Itaú, etc."
            className={cn(
              "w-full px-3 py-2 rounded-lg border border-gray-200",
              errors.name?.message &&
                "border-red-400 focus-visible:ring-red-400"
            )}
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <Select
            value={watch("type")}
            {...register("type")}
            onValueChange={(value) => setValue("type", value)}
          >
            <SelectTrigger
              className={cn(errors.type?.message && "border-red-400")}
            >
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CHECKING">Conta Corrente</SelectItem>
              <SelectItem value="SAVINGS">Poupança</SelectItem>
              <SelectItem value="CREDIT">Cartão de Crédito</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Saldo Inicial (R$)
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

        <div className="flex justify-end gap-4">
          {accountId && (
            <Button
              variant={"destructiveOutline"}
              type="submit"
              isLoading={isLoading}
            >
              Excluir
            </Button>
          )}

          <Button type="submit" isLoading={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
