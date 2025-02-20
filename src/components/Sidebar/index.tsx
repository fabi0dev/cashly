import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import {
  BarChart3,
  Goal,
  LogOut,
  PiggyBank,
  Receipt,
  Settings,
  Tag,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const NAV_LINKS = [
  { label: "Visão Geral", icon: BarChart3, href: "/" },
  { label: "Objetivos", icon: Goal, href: "/goals" },
  //{ label: "Notificações", icon: Bell, href: "/notifications" },
  { label: "Transações", icon: Receipt, href: "/transactions" },
  { label: "Categorias", icon: Tag, href: "/categories" },
  { label: "Contas de Banco", icon: PiggyBank, href: "/accounts/list" },
  { label: "Configurações", icon: Settings, href: "/settings" },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const authData = useAuthStore((state) => state.authData);

  return (
    <div
      className={cn(
        "fixed lg:static inset-y-0 left-0 z-30 w-72",
        "bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen,
          "-translate-x-full lg:translate-x-0": !isOpen,
        }
      )}
    >
      <div className="px-8 py-8">
        <Link to="/" className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-gray-900 dark:text-white" />
          <h1 className="text-xl font-medium text-gray-900 dark:text-white">
            Cash
            <span className="font-bold text-violet-700 dark:text-violet-500">
              ly
            </span>
          </h1>
        </Link>
      </div>

      <div className="px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-900 font-medium">JS</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-300">
              {authData?.user.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Conta Pessoal
            </p>
          </div>
        </div>
      </div>

      <nav className="flex px-8 py-6">
        <ul className="space-y-1">
          {NAV_LINKS.map(({ label, icon: Icon, href }) => {
            const isActive = location.pathname === href;
            return (
              <li key={label}>
                <Link
                  to={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-violet-800 text-white hover:bg-violet-900 dark:bg-violet-950"
                      : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-8">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};
