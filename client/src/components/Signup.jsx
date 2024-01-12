import { useState } from "react";
import AuthDescription from "@/components/AuthDescription.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { AlertTriangle, CheckCircle, CircleUserRound, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signup } from "@/api/auth.js";
import { useMutation } from "@tanstack/react-query";
import "ldrs/helix";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: handleSignup, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: () => {
      const signupFormData = new FormData();
      signupFormData.append("username", username);
      signupFormData.append("password", password);
      signupFormData.append("fname", fname);
      signupFormData.append("lname", lname);
      signupFormData.append("email", email);
      return signup(signupFormData);
    },
    onSuccess: (data) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });
      navigate("/login");
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
            <h1 className={"text-2xl font-bold tracking-tight"}>Create an account</h1>
            <p className={"mt-2 text-sm text-muted-foreground"}>
              Enter your credentials below to create a client account
            </p>
            <div className={"mt-4 grid w-8/12 gap-6"}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignup();
                }}
              >
                <div className={"grid gap-3"}>
                  <Input
                    type={"text"}
                    placeholder={"First Name"}
                    required
                    onChange={(e) => setFname(e.target.value)}
                  />
                  <Input
                    type={"text"}
                    placeholder={"Last Name"}
                    required
                    onChange={(e) => setLname(e.target.value)}
                  />
                  <Input
                    type={"email"}
                    placeholder={"Email"}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                      "Signup with Email"
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
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant={"outline"} className={"gap-2"} onClick={() => navigate("/login")}>
                <CircleUserRound />
                Username
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
