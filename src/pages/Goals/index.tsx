import { Container } from "@/components/Container";
import { Target } from "lucide-react";

const goals = [
  {
    id: 1,
    name: "Fundo de Emergência",
    targetAmount: 10000,
    currentAmount: 3000,
    deadline: "2024-12-31",
    icon: "🎯",
  },
  {
    id: 2,
    name: "Viagem",
    targetAmount: 5000,
    currentAmount: 1500,
    deadline: "2024-08-31",
    icon: "✈️",
  },
];

export const Goals = () => {
  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Container titleHeader="Objetivos">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percentage = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = calculateDaysLeft(goal.deadline);

            return (
              <div
                key={goal.id}
                className="group relative bg-white backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div
                  className={`absolute inset-0  opacity-10 group-hover:opacity-20 transition-opacity`}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg  bg-opacity-10`}>
                        <span className="text-xl">{goal.icon}</span>
                      </div>
                      <h3 className="font-medium text-gray-900">{goal.name}</h3>
                    </div>
                    <Target className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500">Progresso</span>
                        <span className="font-medium text-gray-900">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Valor Atual</p>
                        <p className="font-medium text-gray-900">
                          R$ {goal.currentAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Meta</p>
                        <p className="font-medium text-gray-900">
                          R$ {goal.targetAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        {daysLeft > 0
                          ? `${daysLeft} dias restantes`
                          : "Meta vencida"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Vence em{" "}
                        {new Date(goal.deadline).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
