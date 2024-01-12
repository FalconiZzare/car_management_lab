import { Car } from "lucide-react";
import Logo from "@/assets/logo.png";

const AuthDescription = () => {
  return (
    <div
      className={
        "flex h-full w-[50%] flex-col items-start justify-between gap-16 rounded-r-2xl bg-card p-8"
      }
    >
      <div className={"flex flex-row items-center justify-center gap-3"}>
        <Car size={"30"} color={"hsl(var(--primary))"} />
        <h2 className={"text-[1rem] font-medium"}>Mayer Dua Rentals</h2>
      </div>
      <img src={Logo} alt={"logo"} width={"300px"} className={"m-4 mt-10 self-center"} />
      <div className={"flex flex-col items-start gap-2"}>
        <h2 className={"text-lg"}>
          {
            "This rental service saved me a hefty four hours of delay and helped me get a fine tuned car with excellent condition under no time at all!"
          }
        </h2>
        <h2 className={"text-sm"}>- Random NSU Model</h2>
      </div>
    </div>
  );
};

export default AuthDescription;
