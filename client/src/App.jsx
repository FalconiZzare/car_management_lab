import { ThemeProvider } from "@/hooks/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import RouteTable from "@/routes/RouteTable.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <ThemeProvider
          defaultTheme="dark"
          attribute={"class"}
          enableSystem
          disableTransitionOnChange={false}
        >
          <RouteTable />
          <Toaster position={"top-center"} closeButton />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
