import React, { useState } from "react";
import { Label } from "@/components/ui/label.jsx";
import { makes } from "@/constants/DemoData.js";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import DropDown from "@/components/DropDown.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";

const DashBoard = () => {
  const [make, setMake] = useState("");

  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[8rem] mb-4 flex flex-col items-start justify-start gap-[8rem] rounded-2xl bg-card p-10"
        }
      >
        <div className={"flex w-full flex-col gap-10"}>
          <p className={"text-3xl"}>Add Make and Part To Database</p>
          <div className={"flex w-full items-start justify-between"}>
            <div className={"flex flex-col gap-2"}>
              <Label className={"text-lg"}>Add A Make</Label>
              <div className={"flex items-center justify-center gap-4"}>
                <Input type={"text"} placeholder={"e.g. Mercedes BenZ"} className={"w-56"} />
                <Button>Add Make</Button>
              </div>
            </div>
            <div className={"flex items-end gap-6"}>
              <div className={"flex flex-col justify-center gap-2"}>
                <Label className={"text-lg"}>Select A Make</Label>
                <DropDown
                  data={makes}
                  placeholder={"make"}
                  value={make}
                  setValue={setMake}
                  widthInPx={200}
                />
              </div>
              <div className={"flex flex-col justify-center gap-2"}>
                <Label className={"text-lg"}>Enter Model</Label>
                <Input type={"text"} placeholder={"e.g. EQB Sedan"} className={"w-56"} />
              </div>
              <div className={"flex flex-col justify-center gap-2"}>
                <Label className={"text-lg"}>Enter Name</Label>
                <Input type={"text"} placeholder={"e.g. Brake & Wheel Hub"} className={"w-56"} />
              </div>
              <div className={"flex flex-col justify-center gap-2"}>
                <Label className={"text-lg"}>Enter Price</Label>
                <Input type={"text"} placeholder={"e.g. 60"} className={"w-56"} />
              </div>
              <Button>Add Part</Button>
            </div>
          </div>
        </div>
        <div className={"flex w-full flex-col gap-10"}>
          <p className={"text-3xl"}>Add A Car To Database</p>
          <div className={"flex items-end gap-6"}>
            <div className={"flex w-[14%] flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Select A Make</Label>
              <DropDown
                data={makes}
                placeholder={"make"}
                value={make}
                setValue={setMake}
                widthInPx={300}
              />
            </div>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Enter Model</Label>
              <Input type={"text"} placeholder={"e.g. EQB Sedan"} className={"w-56"} />
            </div>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Enter Rent</Label>
              <Input type={"text"} placeholder={"e.g. 6300"} className={"w-56"} />
            </div>
          </div>
          <div className={"flex w-full items-start gap-8"}>
            <div className={"flex h-full flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Picture</Label>
              <Input id="picture" type="file" className={"h-full cursor-pointer"} />
            </div>
            <div className={"flex w-2/6 flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Enter Car Condition</Label>
              <Textarea placeholder={"e.g. Looks like new with 300 miles travel distance"} />
            </div>
            <Button className={"self-end"}>Add Car</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
