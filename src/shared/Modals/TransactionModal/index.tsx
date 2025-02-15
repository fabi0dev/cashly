import { TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/pages/Categories";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/Dialog";
import { useTransactionModal } from "./useTransactionModal";
import DatePicker from "@/components/DatePicker";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
  const { register, setValue, watch, errors, submit } = useTransactionModal();

  const transactionType = watch("type");

  return (
    <Dialog title="Nova Transação" open={isOpen} onOpenChange={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue("type", "income")}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              transactionType === "income"
                ? "bg-green-50 border-green-200 text-green-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Receita</span>
          </button>
          <button
            type="button"
            onClick={() => setValue("type", "expense")}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-colors ${
              transactionType === "expense"
                ? "bg-red-50 border-red-200 text-red-600"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <TrendingDown className="w-4 h-4" />
            <span className="font-medium">Despesa</span>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <Input
            {...register("description")}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Ex: Compras no supermercado"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor (R$)
          </label>
          <Input
            type="number"
            {...register("amount")}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="0,00"
          />
          <p className="text-red-500 text-sm">{errors.amount?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <div className="relative">
            <Select
              {...register("category")}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data
          </label>
          <div className="relative">
            <DatePicker
              value={watch("date")}
              onChange={(date) =>
                setValue("date", date, { shouldValidate: true })
              }
            />
          </div>
          <p className="text-red-500 text-sm">{errors.date?.message}</p>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Dialog>
  );
}
