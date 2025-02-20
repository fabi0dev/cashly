import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "../Sidebar";

export interface ContainerProps {
  titleHeader?: string;
  children: React.ReactNode;
  rightContentHeader?: React.ReactNode;
  showHeader?: boolean;
}

export const Container = ({
  titleHeader,
  rightContentHeader,
  children,
  showHeader = true,
}: ContainerProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900  overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 overflow-auto">
        {showHeader && (
          <Header
            title={titleHeader}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            rightContent={rightContentHeader}
          />
        )}

        <main className="mx-auto max-w-[1024px] p-5 py-1 ">{children}</main>
      </div>
    </div>
  );
};
