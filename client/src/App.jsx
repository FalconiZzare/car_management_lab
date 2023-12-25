import { ThemeProvider } from "@/hooks/ThemeProvider.jsx";

function App() {
  return (
    <ThemeProvider
      defaultTheme="light"
      attribute={"class"}
      enableSystem
      disableTransitionOnChange={false}
    >
      <div className={"flex h-full flex-col items-center justify-center"}>Hello</div>
    </ThemeProvider>
  );
}

export default App;
