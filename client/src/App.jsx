import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@/hooks/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import RouteTable from "@/routes/RouteTable.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/auth.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getLocalStorageItem } from "@/utils/utils.js";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const id = getLocalStorageItem("x-user-id");

  const { isSuccess, isError, data } = useQuery({
    queryKey: ["getUser", id],
    queryFn: () => getUser(id)
  });

  useEffect(() => {
    if (isSuccess) setUser(data?.data.data);

    if (isError) setUser(null);
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
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
