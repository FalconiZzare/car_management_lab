import { ThemeProvider } from "@/hooks/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import RouteTable from "@/routes/RouteTable.jsx";

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
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
