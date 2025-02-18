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

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { register, setValue, errors, submit, isLoading } = useAccountModal({
    onClose,
  });

  return (
    <Dialog title="Nova Conta de Banco" open={isOpen} onOpenChange={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <Input
            {...register("name")}
            placeholder="Nubank, Itaú, etc."
            className="w-full px-3 py-2 rounded-lg border border-gray-200"
            autoFocus
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <Select
            {...register("type")}
            onValueChange={(value) => setValue("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CHECKING">Conta Corrente</SelectItem>
              <SelectItem value="SAVINGS">Poupança</SelectItem>
              <SelectItem value="CREDIT">Cartão de Crédito</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-red-500 text-sm">{errors.type?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Saldo Inicial (R$)
          </label>
          <CurrencyInput
            onChangeValue={(_, value) => {
              setValue("balance", Number(value));
            }}
            InputElement={<Input placeholder="0,00" />}
            currency={"BRL"}
          />
          <p className="text-red-500 text-sm">{errors.balance?.message}</p>
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
