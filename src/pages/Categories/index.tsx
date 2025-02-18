import { Container } from "@/components/Container";
import { Receipt } from "lucide-react";
import { cn } from "@/lib/utils";

export const categories = [
  { id: 1, name: "Alimentação", icon: "🍽️" },
  { id: 2, name: "Transporte", icon: "🚗" },
  { id: 3, name: "Moradia", icon: "🏠" },
  { id: 4, name: "Saúde", icon: "⚕️" },
  { id: 5, name: "Educação", icon: "📚" },
  { id: 6, name: "Lazer", icon: "🎮" },
  { id: 7, name: "Salário", icon: "💰" },
  { id: 8, name: "Investimentos", icon: "📈" },
  { id: 9, name: "Mercado", icon: "🛒" },
  { id: 10, name: "Outros", icon: "📦" },
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
