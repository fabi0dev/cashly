import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bell,
  CreditCard,
  Goal,
  LogOut,
  Settings,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const NAV_LINKS = [
  { label: "Visão Geral", icon: BarChart3, href: "#", active: true },
  { label: "Cartões", icon: CreditCard, href: "#" },
  { label: "Objetivos", icon: Goal, href: "#" },
  { label: "Notificações", icon: Bell, href: "#" },
  { label: "Configurações", icon: Settings, href: "#" },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <div
      className={cn(
        "fixed lg:static inset-y-0 left-0 z-30 w-64 backdrop-blur-xl",
        "shadow-lg shadow-black/5 bg-white transform transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen,
          "-translate-x-full lg:translate-x-0": !isOpen,
        }
      )}
    >
      {/* Logo Section */}
      <div className="px-6 py-8">
        <Link to="/" className="flex items-center gap-3">
          <Wallet className="w-6 h-6 text-gray-900" />
          <h1 className="text-xl font-medium text-gray-900">
            Cash<span className="font-bold text-purple-700">ly</span>
          </h1>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-4">
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
      <nav className="flex px-3 py-6">
        <ul className="space-y-1">
          {NAV_LINKS.map(({ label, icon: Icon, href, active }) => (
            <li key={label}>
              <a
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  active
                    ? "bg-purple-800 text-white hover:bg-purple-900"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3">
        <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors w-full">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
};
