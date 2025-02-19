import { Container } from "@/components/Container";
import { Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

export const CategoryIncomes = ["Salário", "Investimentos", "Outro"];

export const CategoryExpenses = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Educação",
  "Lazer",
  "Mercado",
  "Outro",
];

export const categories = [...CategoryIncomes, ...CategoryExpenses];

export const Categories = () => {
  return (
    <Container titleHeader="Categorias">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className={cn(
                "group relative bg-white ",
                "rounded-xl overflow-hidden transition-all duration-300"
              )}
            >
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center gap-3 p-2">
                  <h3 className="font-medium text-gray-900">{category}</h3>
                </div>
                <Receipt className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
