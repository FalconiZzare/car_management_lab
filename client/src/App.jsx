import { ThemeProvider } from "@/hooks/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import RouteTable from "@/routes/RouteTable.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <ThemeProvider
        defaultTheme="dark"
        attribute={"class"}
        enableSystem
        disableTransitionOnChange={false}
      >
        <RouteTable />
        <Toaster position={"top-center"} closeButton />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
