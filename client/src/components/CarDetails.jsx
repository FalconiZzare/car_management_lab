import Car from "@/assets/evo-spyder.jpg";
import { Separator } from "@/components/ui/separator.jsx";
import { car } from "@/constants/DemoData.js";

const CarDetails = () => {
  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[8rem] mb-4 flex h-[700px] select-none flex-row items-center justify-around rounded-2xl bg-card p-10"
        }
      >
        <img src={Car} alt={"car"} className={"pointer-events-none max-w-[800px] rounded-2xl"} />
        <div className={"flex w-4/12 flex-col items-center gap-6"}>
          <p className={"text-3xl font-extralight"}>
            <span className={"text-primary"}>Lamborghini</span> HURACÁN EVO SPYDER
          </p>
          <Separator className={"bg-background"} />
          <p className={"self-start text-4xl font-medium"}>$6300</p>
          <div className={"flex w-full flex-col gap-4 rounded-xl border border-background p-6"}>
            {Object.keys(car).map((key, index) => (
              <div key={index} className={"flex flex-row items-start justify-start gap-12"}>
                <p className={"min-w-[60px] capitalize"}>{key + ":"}</p>
                <p className={"capitalize"}>{key === "rent" ? `$${car[key]} Per Day` : car[key]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
