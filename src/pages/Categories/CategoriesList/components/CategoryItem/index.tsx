import { Dropdown } from "@/components/Dropdown";
import { List } from "@/components/List";
import { Button } from "@/components/ui/button";
import { Category } from "@/services/category";
import { DollarSign, EllipsisVertical, Star } from "lucide-react";
import { useCategoryItem } from "./useCategoryItem";

interface CategoryItemProps {
  item: Category;
}

export const CategoryItem = ({ item }: CategoryItemProps) => {
  const { mutationFavorite } = useCategoryItem();

  return (
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
      <List.Td>
        {item.importanceLevel && (
          <>
            <DollarSign
              className={
                item.importanceLevel >= 1 ? "text-green-600" : "text-gray-600"
              }
              size={18}
            />
            <DollarSign
              className={
                item.importanceLevel >= 2 ? "text-green-600" : "text-gray-600"
              }
              size={18}
            />
            <DollarSign
              className={
                item.importanceLevel >= 3 ? "text-green-600" : "text-gray-600"
              }
              size={18}
            />
          </>
        )}
      </List.Td>

      <List.Td className="flex justify-end">
        <Dropdown
          menuItems={[
            {
              label: "Editar",
              onClick: () => {},
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
  );
};
