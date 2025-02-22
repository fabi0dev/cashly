import { Container } from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import { queries } from "@/queries";
import { List } from "@/components/List";
import { CategoryItem } from "./components/CategoryItem";
import { Button } from "@/components/ui/button";

export const Categories = () => {
  const { isLoading: isLoadingCategories, data: dataCategories } = useQuery({
    ...queries.categories.getAll(),
  });

  return (
    <Container
      titleHeader="Categorias"
      rightContentHeader={
        <Button onClick={() => {}}>
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
            label: "Favorita",
            className: "justify-center",
          },
          {
            label: "Importância",
          },
          {
            label: "",
          },
        ]}
        isLoading={isLoadingCategories}
        data={dataCategories}
        render={(item) => <CategoryItem item={item} />}
      />
    </Container>
  );
};
