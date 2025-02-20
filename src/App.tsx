import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routes";
import { Toaster } from "sonner";
import { useTheme } from "./hooks/useTheme";

const queryClient = new QueryClient();

export default function App() {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
      <Toaster />
    </QueryClientProvider>
  );
}
