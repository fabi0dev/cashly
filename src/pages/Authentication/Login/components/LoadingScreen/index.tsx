import { Spinner } from "@/components/Spinner";

export const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-50 flex items-center justify-center rounded-3xl z-40">
      <Spinner className="dark:text-white" />
    </div>
  );
};
