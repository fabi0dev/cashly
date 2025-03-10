import { Container } from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { queries } from "@/queries";
import { List } from "@/components/List";
import { CategoryItem } from "./components/CategoryItem";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/shared/Modals/CategoryModal";
import { useState } from "react";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";

export const Categories = () => {
  const { isLoading: isLoadingCategories, data: dataCategories } = useQuery({
    ...queries.categories.getAll(),
  });

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <Container
      titleHeader="Categorias"
      rightContentHeader={
        <Button onClick={() => setShowCategoryModal(true)}>
          <span className="hidden sm:inline">Nova categoria</span>
        </Button>
      }
    >
      <List
        columns={[
          {
            label: "Nome",
          },
          {
            label: "Tipo",
          },
          {
            label: "Relevância",
          },

          {
            label: "Favorita",
            className: "justify-center",
          },

          {
            label: "",
          },
        ]}
        isLoading={isLoadingCategories}
        data={dataCategories}
        render={(item) => <CategoryItem item={item} />}
        renderEmpty={() => (
          <EmptyPlaceholder description="Nenhum categoria cadastrada" />
        )}
      />

      {showCategoryModal && (
        <CategoryModal isOpen onClose={() => setShowCategoryModal(false)} />
      )}
    </Container>
  );
};
