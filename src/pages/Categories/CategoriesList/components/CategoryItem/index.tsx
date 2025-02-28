import { Dropdown } from "@/components/Dropdown";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import { Category } from "@/services/category";
import { EllipsisVertical, Star } from "lucide-react";
import { useCategoryItem } from "./useCategoryItem";
import { CategoryModal } from "@/shared/Modals/CategoryModal";
import { useState } from "react";
import { getCategoryImportanceLevel } from "@/constants/CategoryImportanceLevel";

interface CategoryItemProps {
  item: Category;
}

export const CategoryItem = ({ item }: CategoryItemProps) => {
  const { mutationFavorite } = useCategoryItem();
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <>
      <List.Row>
        <List.Td>{item.name}</List.Td>
        <List.Td>
          {item.type === "EXPENSE" && "Despesa"}
          {item.type === "INCOME" && "Receita"}
        </List.Td>
        <List.Td className="flex justify-center">
          {item.isFavorite && (
            <Star
              onClick={() => mutationFavorite(item)}
              className="text-yellow-500"
              size={18}
            />
          )}
          {!item.isFavorite && (
            <Star
              size={18}
              onClick={() => mutationFavorite(item)}
              className="hover:text-yellow-500"
            />
          )}
        </List.Td>
        <List.Td>{getCategoryImportanceLevel(item.importanceLevel)}</List.Td>

        <List.Td className="flex justify-end">
          <Dropdown
            menuItems={[
              {
                label: "Editar",
                onClick: () => setShowCategoryModal(true),
              },
              {
                label: "Excluir",
                onClick: () => {},
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
    </>
  );
};
