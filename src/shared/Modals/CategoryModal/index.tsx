import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/Dialog";

import { useCategoryModal } from "./useCategoryModal";
import { ControlledSelect } from "@/components/ControlledSelect";
import { ControlledCheckbox } from "@/components/ControlledCheckbox";
import { ControlledInput } from "@/components/ControlledInput";
import { FormContainer } from "@/components/FormContainer";

interface CategoryModalProps {
  categoryId?: string;
  isOpen?: boolean;
  onClose: () => void;
}

export function CategoryModal({
  categoryId,
  isOpen = true,
  onClose,
}: CategoryModalProps) {
  const { formMethods, submit, isLoadingDataCategory, isLoadingManager } =
    useCategoryModal({
      categoryId,
      onClose,
    });

  const { control, watch } = formMethods;
  const type = watch("type");

  return (
    <Dialog
      title={!categoryId ? "Nova Categoria" : "Editar Categoria"}
      open={isOpen}
      onOpenChange={onClose}
      isLoading={isLoadingDataCategory}
    >
      <FormContainer onSubmit={submit} className="space-y-4">
        <ControlledInput
          control={control}
          label="Nome"
          name="name"
          placeholder={
            type === "EXPENSE"
              ? "Mercado, lazer, internet, etc."
              : "Salário, presente, etc."
          }
          autoFocus
          autoComplete="off"
        />

        <FormContainer.Column cols={2}>
          <ControlledSelect
            label="Relevância"
            control={control}
            name="importanceLevel"
            options={[
              {
                label: "Irrelevante",
                value: 1,
              },
              {
                label: "Normal",
                value: 2,
              },
              {
                label: "Importante",
                value: 3,
              },
            ]}
          />

          <ControlledSelect
            label="Tipo"
            control={control}
            name="type"
            options={[
              {
                label: "Despesa",
                value: "EXPENSE",
              },
              {
                label: "Entrada",
                value: "INCOME",
              },
            ]}
          />
        </FormContainer.Column>

        <ControlledCheckbox
          control={control}
          label="Favorita"
          name="isFavorite"
        />

        <div className="flex justify-end gap-4">
          <Button type="submit" isLoading={isLoadingManager}>
            Salvar
          </Button>
        </div>
      </FormContainer>
    </Dialog>
  );
}
