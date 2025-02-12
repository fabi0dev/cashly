import { Container } from "@/components/Container";
import { Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

export const categories = [
  { id: 1, name: "Alimentação", icon: "🍽️", budget: 800 },
  { id: 2, name: "Transporte", icon: "🚗", budget: 400 },
  { id: 3, name: "Moradia", icon: "🏠", budget: 2000 },
  { id: 4, name: "Saúde", icon: "⚕️", budget: 500 },
  { id: 5, name: "Educação", icon: "📚", budget: 300 },
  { id: 6, name: "Lazer", icon: "🎮", budget: 200 },
  { id: 7, name: "Salário", icon: "💰", budget: 0 },
  {
    id: 8,
    name: "Investimentos",
    color: "bg-cyan-500",
    icon: "📈",
    budget: 1000,
  },
  { id: 9, name: "Outros", color: "bg-gray-500", icon: "📦", budget: 200 },
];

export const Categories = () => {
  return (
    <Container titleHeader="Categorias">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className={cn(
                "group relative bg-white ",
                "rounded-xl overflow-hidden transition-all duration-300"
              )}
            >
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center gap-3 p-2">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
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
