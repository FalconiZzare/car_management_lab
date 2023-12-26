import React from "react";
import { Separator } from "@/components/ui/separator.jsx";
import { Button } from "@/components/ui/button.jsx";

const FeaturedListings = () => {
  return (
    <div>
      <div className={"mb-[3rem] flex flex-col gap-3"}>
        <p className={"text-2xl font-medium tracking-normal text-primary"}>Handy Picked</p>
        <p className={"text-5xl font-bold tracking-wider"}>Featured Listings</p>
      </div>
      <div className="grid grid-cols-4 gap-x-6">
        {Array.from({ length: 5 }).map((item, index) => (
          <div
            key={index}
            className={`relative mb-6 flex flex-col items-center justify-start overflow-hidden rounded-2xl border border-ring bg-card dark:border-accent ${
              index === 0 ? "col-span-2 row-span-2" : "col-span-1 h-[350px]"
            } group cursor-pointer`}
          >
            <div
              className={
                " h-full w-full bg-[url('./src/assets/evo-spyder.jpg')] bg-cover bg-center bg-no-repeat duration-300 ease-in group-hover:scale-110"
              }
            ></div>
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
                  <Button>Rent</Button>
                  <Button
                    variant={"outline"}
                    className={"border-ring bg-transparent hover:bg-background"}
                  >
                    Servicing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
