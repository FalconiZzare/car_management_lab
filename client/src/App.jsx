import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@/hooks/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import RouteTable from "@/routes/RouteTable.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";
import { getLocalStorageItem } from "@/utils/utils.js";
import { useUserQuery } from "@/hooks/use-api.js";

export const UserContext = createContext({});

function App() {
  const [user, setUser] = useState("");
  const id = getLocalStorageItem("x-user-id");

  const { isSuccess, isError, data } = useUserQuery(id);

  useEffect(() => {
    if (isSuccess) setUser(data?.data.data);

    if (isError) setUser("");
  }, [id, data, isError, isSuccess]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  );
}

export default App;
