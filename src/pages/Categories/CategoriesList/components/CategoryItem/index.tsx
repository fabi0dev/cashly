import { Dropdown } from "@/components/Dropdown";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import { Category } from "@/services/category";
import { EllipsisVertical, Star } from "lucide-react";
import { useCategoryItem } from "./useCategoryItem";
import { CategoryModal } from "@/shared/Modals/CategoryModal";
import { useState } from "react";
import { getCategoryImportanceLevel } from "@/constants/CategoryImportanceLevel";
import { Spinner } from "@/components/Spinner";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface CategoryItemProps {
  item: Category;
}

export const CategoryItem = ({ item }: CategoryItemProps) => {
  const {
    mutationFavorite,
    isLoadingFavorite,

    mutationDelete,
    isLoadingDelete,
  } = useCategoryItem();

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCategoryDelete, setShowCategoryDelete] = useState(false);

  return (
    <>
      <List.Row>
        <List.Td>{item.name}</List.Td>
        <List.Td>
          {item.type === "EXPENSE" && "Despesa"}
          {item.type === "INCOME" && "Entrada"}
        </List.Td>

        <List.Td>{getCategoryImportanceLevel(item.importanceLevel)}</List.Td>

        <List.Td className="flex justify-center">
          {isLoadingFavorite && <Spinner />}

          {item.isFavorite && !isLoadingFavorite && (
            <Star
              onClick={() => mutationFavorite(item)}
              className="text-yellow-500"
              size={18}
            />
          )}
          {!item.isFavorite && !isLoadingFavorite && (
            <Star
              size={18}
              onClick={() => mutationFavorite(item)}
              className="text-gray-500 hover:text-yellow-500"
            />
          )}
        </List.Td>

        <List.Td className="flex justify-end">
          <Dropdown
            menuItems={[
              {
                label: "Editar",
                onClick: () => setShowCategoryModal(true),
              },
              {
                label: "Excluir",
                onClick: () => setShowCategoryDelete(true),
              },
            ]}
            trigger={
              <Button variant={"ghost"} size={"icon"}>
                <EllipsisVertical />
              </Button>
            }
          />
        </List.Td>
      </List.Row>

      {showCategoryModal && (
        <CategoryModal
          categoryId={item.id}
          onClose={() => setShowCategoryModal(false)}
        />
      )}

      {showCategoryDelete && (
        <ConfirmDialog
          open
          isLoading={isLoadingDelete}
          onOpenChange={() => setShowCategoryDelete(false)}
          description={"Você tem certeza que deseja excluir essa categoria?"}
          onConfirm={() => mutationDelete(item.id)}
          onCancel={() => setShowCategoryDelete(false)}
        />
      )}
    </>
  );
};
