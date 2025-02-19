import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routes";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function App() {
  document.documentElement.classList.add("dark");

  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
      <Toaster />
    </QueryClientProvider>
  );
}
