import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/Dialog";
import { Input } from "@/components/ui/input";
import { schemaGoalModal, SchemaGoalModal } from "./schema";

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SchemaGoalModal) => void;
}

export function GoalModal({ isOpen, onClose, onSubmit }: GoalModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaGoalModal>({
    resolver: yupResolver(schemaGoalModal),
    defaultValues: {
      name: "",
      targetAmount: 0,
      currentAmount: 0,
      deadline: "",
      color: "#3b82f6",
      icon: "🎯",
    },
  });

  return (
    <Dialog title="Nova Meta Financeira" open={isOpen} onOpenChange={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome da Meta
          </label>
          <Input {...register("name")} placeholder="Ex: Viagem dos sonhos" />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor Alvo (R$)
            </label>
            <Input type="number" {...register("targetAmount")} />
            <p className="text-red-500 text-sm">
              {errors.targetAmount?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valor Atual (R$)
            </label>
            <Input type="number" {...register("currentAmount")} />
            <p className="text-red-500 text-sm">
              {errors.currentAmount?.message}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Limite
          </label>
          <Input type="date" {...register("deadline")} />
          <p className="text-red-500 text-sm">{errors.deadline?.message}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cor
          </label>
          <Input type="color" {...register("color")} />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Dialog>
  );
}
