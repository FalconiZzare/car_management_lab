import { useContext, useState } from "react";
import AuthDescription from "@/components/AuthDescription.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth.js";
import { setLocalStorageItem } from "@/utils/utils.js";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserContext } from "@/App.jsx";
import { AlertTriangle, Eye, EyeOff, Mail } from "lucide-react";
import "ldrs/helix";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  if (user) {
    navigate("/");
    return;
  }

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => {
      const loginFormData = new FormData();
      loginFormData.append("username", username);
      loginFormData.append("password", password);

      return login(loginFormData);
    },
    onSuccess: (data) => {
      setLocalStorageItem("x-user-id", data?.data.id);
      setUser(data?.data.id);
      navigate(-1);
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  return (
    <div className={"container flex h-dvh w-full flex-col items-center justify-center"}>
      <div
        className={
          "flex h-[700px] flex-row overflow-hidden rounded-xl border border-accent shadow-[0_0_15px_1px_rgba(0,0,0,0.40)]"
        }
      >
        <AuthDescription />
        <div className={"flex h-full w-[50%] flex-col items-center justify-center gap-3 p-8"}>
          <Button variant={"ghost"} className={"mb-auto ml-auto"} onClick={() => navigate("/")}>
            Home
          </Button>
          <div className={"mb-auto flex w-full flex-col items-center pb-12"}>
            <h1 className={"mb-2 text-2xl font-bold tracking-tight"}>Login Portal</h1>
            <p className={"text-sm text-muted-foreground"}>Enter your credentials below to login</p>
            <div className={"mt-4 grid w-8/12 gap-6"}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <div className={"grid gap-3"}>
                  <Input
                    type={"text"}
                    placeholder={"Username"}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div className={"relative flex items-center"}>
                    <div
                      className={
                        "absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer"
                      }
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <EyeOff /> : <Eye />}
                    </div>
                    <Input
                      type={showPass ? "text" : "password"}
                      placeholder={"Password"}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type={"submit"} disabled={isPending}>
                    {isPending ? (
                      <l-helix size="30" speed="3" color="hsl(var(--foreground))" />
                    ) : (
                      "Log In with Username"
                    )}
                  </Button>
                </div>
              </form>
              <div className={"relative"}>
                <div className={"absolute inset-0 flex items-center"}>
                  <span className={"w-full border-t border-muted-foreground"} />
                </div>
                <div className={"relative flex justify-center text-xs uppercase"}>
                  <span className={"bg-background px-2 text-muted-foreground"}>
                    Don't have an account?
                  </span>
                </div>
              </div>
              <Button variant={"outline"} className={"gap-2"} onClick={() => navigate("/signup")}>
                <Mail />
                Signup with Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
