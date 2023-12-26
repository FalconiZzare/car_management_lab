import AuthDescription from "@/components/AuthDescription.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className={"container flex h-dvh w-full flex-col items-center justify-center"}>
      <div
        className={
          "flex h-[700px] flex-row overflow-hidden rounded-xl border border-accent shadow-[0_0_15px_1px_rgba(0,0,0,0.40)]"
        }
      >
        <AuthDescription />
        <div className={"flex h-full w-[50%] flex-col items-center justify-center gap-3 p-8"}>
          <h1 className={"text-2xl font-bold tracking-tight"}>Create and account</h1>
          <p className={"text-sm text-muted-foreground"}>
            Enter your credentials below to create an account
          </p>
          <div className={"mt-4 grid w-8/12 gap-6"}>
            <form>
              <div className={"grid gap-3"}>
                <Input type={"text"} placeholder={"First Name"} required />
                <Input type={"text"} placeholder={"Last Name"} required />
                <Input type={"email"} placeholder={"Email"} required />
                <Input type={"text"} placeholder={"Username"} required />
                <Input type={"password"} placeholder={"Password"} required />
                <Button type={"submit"}>Signup with Email</Button>
              </div>
            </form>
            <div className={"relative"}>
              <div className={"absolute inset-0 flex items-center"}>
                <span className={"w-full border-t border-muted-foreground"} />
              </div>
              <div className={"relative flex justify-center text-xs uppercase"}>
                <span className={"bg-background px-2 text-muted-foreground"}>Or continue with</span>
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
  );
};

export default Signup;
