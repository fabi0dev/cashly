import { cn } from "@/lib/utils";
import {
  BarChart3,
  Goal,
  LogOut,
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
  { label: "Configurações", icon: Settings, href: "/settings" },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "fixed lg:static inset-y-0 left-0 z-30 w-72 backdrop-blur-xl",
        "bg-white transform transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen,
          "-translate-x-full lg:translate-x-0": !isOpen,
        }
      )}
    >
      {/* Logo Section */}
      <div className="px-8 py-8">
        <Link to="/" className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-gray-900" />
          <h1 className="text-xl font-medium text-gray-900">
            Cash<span className="font-bold text-purple-700">ly</span>
          </h1>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-900 font-medium">JS</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">João Silva</h3>
            <p className="text-sm text-gray-500">Conta Pessoal</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
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
                      ? "bg-purple-800 text-white hover:bg-purple-900"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-8">
        <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};
