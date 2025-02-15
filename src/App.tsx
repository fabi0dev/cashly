import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routers from "./routes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routers />
    </QueryClientProvider>
  );
}
