import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "../Sidebar";
import { Spinner } from "../Spinner";

export interface ContainerProps {
  titleHeader?: string;
  children: React.ReactNode;
  rightContentHeader?: React.ReactNode;
  showHeader?: boolean;
  hideGoBack?: boolean;
  isLoading?: boolean;
}

export const Container = ({
  titleHeader,
  rightContentHeader,
  children,
  showHeader = true,
  hideGoBack,
  isLoading,
}: ContainerProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900 overflow-hidden text-[15px]">
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
            hideGoBack={hideGoBack}
          />
        )}

        <main className="mx-auto max-w-[1024px] p-5 pt-1 pb-5 ">
          {children}

          {isLoading && (
            <div className="flex justify-center items-center my-10">
              <Spinner />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
