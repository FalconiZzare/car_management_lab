import { useState } from "react";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Search } from "lucide-react";
import DropDown from "@/components/DropDown.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { useNavigate } from "react-router-dom";
import { makes, models } from "@/constants/DemoData.js";
import CarCardBottom from "@/components/CarCardBottom.jsx";

const Cars = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const navigate = useNavigate();
  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[8rem] mb-8 flex flex-row items-center justify-center gap-10 rounded-2xl bg-card py-10"
        }
      >
        <DropDown
          data={makes}
          placeholder={"make"}
          value={make}
          setValue={setMake}
          widthClassName={"w-[220px]"}
        />
        <DropDown
          data={models}
          placeholder={"model"}
          value={model}
          setValue={setModel}
          widthClassName={"w-[220px]"}
          disabled={true}
        />
        <Separator orientation={"vertical"} className={"h-[50px] w-[2px] bg-background"} />
        <div className="flex w-full max-w-xl items-center space-x-2">
          <Input type="text" placeholder="Search by car name" className={""} />
          <Button
            type="submit"
            variant={"outline"}
            className={"gap-2 text-primary hover:border-primary"}
          >
            <Search />
            Search
          </Button>
        </div>
      </div>
      <div className={"mx-[8rem] mb-6 flex flex-col gap-10"}>
        <p className={"text-5xl font-bold tracking-wider"}>Car Gallery</p>
        <div className={"grid grid-cols-4 gap-x-6"}>
          {Array.from({ length: 16 }).map((item, index) => (
            <div
              key={index}
              className={
                " group relative col-span-1 mb-6 flex h-[350px] cursor-pointer flex-col items-center justify-start overflow-hidden rounded-2xl border border-ring bg-card dark:border-accent"
              }
              onClick={() => navigate("/cars/details/1")}
            >
              <div
                className={
                  " h-full w-full bg-[url('./src/assets/evo-spyder.jpg')] bg-cover bg-center bg-no-repeat duration-300 ease-in group-hover:scale-110"
                }
              />
              <CarCardBottom index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
