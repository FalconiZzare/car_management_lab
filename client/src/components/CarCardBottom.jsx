import React from "react";
import { Separator } from "@/components/ui/separator.jsx";
import RentPopover from "@/components/RentPopover.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

const CarCardBottom = ({ index }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "absolute bottom-0 flex h-[120px] w-full flex-col items-start justify-center gap-4 bg-card p-4"
      }
    >
      <p className={"text-lg font-semibold leading-none tracking-wide"}>
        <span className={"font-bold text-primary"}>Lamborghini</span> HURACÁN EVO SPYDER
      </p>
      <Separator className={"bg-accent dark:bg-background"} />
      <div className={"flex w-full flex-row items-center justify-between"}>
        <p className={"text-2xl font-medium"}>$6300</p>
        <div className={"flex flex-row gap-4"}>
          <div className={index === 3 ? "cursor-no-drop" : undefined}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <RentPopover disabled={index === 3} />
            </div>
          </div>
          <Button
            variant={"outline"}
            className={"border-ring bg-transparent hover:bg-background"}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/cars/servicing/1");
            }}
          >
            Servicing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCardBottom;
