import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "@/hooks/ThemeProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import RouteTable from "@/routes/RouteTable.jsx";
import { Toaster } from "@/components/ui/sonner.jsx";
import { useMutation } from "@tanstack/react-query";
import { getUser } from "@/api/auth.js";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getLocalStorageItem } from "@/utils/utils.js";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const id = getLocalStorageItem("x-user-id");

  const { mutate } = useMutation({
    mutationKey: ["getUser"],
    mutationFn: () => {
      return getUser(id);
    },
    onSuccess: (data) => {
      setUser(data?.data.data);
    },
    onError: () => {
      setUser(null);
    }
  });

  useEffect(() => {
    if (id) mutate();
    else setUser(null);
  }, [id]);

  console.log(user);

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
