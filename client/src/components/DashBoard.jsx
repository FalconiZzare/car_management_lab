import { useState } from "react";
import { Label } from "@/components/ui/label.jsx";
import { makes, models } from "@/constants/DemoData.js";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import DropDown from "@/components/DropDown.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Image, XCircle } from "lucide-react";

const DashBoard = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState(null);

  const handleClearFile = () => {
    setImage(null);
    document.getElementById("picture").value = "";
  };

  return (
    <div className={"mt-24"}>
      <div className={"mx-[8rem] mb-8 flex flex-col items-start justify-start gap-[4rem] pt-6"}>
        <div className={"flex w-full flex-col gap-6 rounded-2xl bg-card p-10"}>
          <p className={"text-3xl"}>Add A Make</p>
          <div className={"flex items-center justify-start gap-4"}>
            <Input type={"text"} placeholder={"e.g. Mercedes BenZ"} className={"w-56"} />
            <Button>Add Make</Button>
          </div>
        </div>

        <div className={"flex w-full flex-col items-center gap-10 rounded-2xl bg-card p-10"}>
          <div className={"flex w-full items-center gap-6"}>
            <div className={" flex flex-col items-start gap-6"}>
              <p className={"text-3xl"}>Enlist A Car</p>
              <div className={"flex flex-col items-start justify-start gap-8"}>
                <div className={"flex items-end gap-6"}>
                  <div className={"flex flex-col justify-center gap-2"}>
                    <Label className={"text-lg"}>Select A Make</Label>
                    <DropDown
                      data={makes}
                      placeholder={"make"}
                      value={make}
                      setValue={setMake}
                      widthClassName={"w-56"}
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
                <div className={"flex w-full flex-col justify-center gap-2"}>
                  <Label className={"text-lg"}>Enter Details About Car Condition</Label>
                  <Textarea placeholder={"e.g. Looks like new with 300 miles travel distance"} />
                </div>
              </div>
            </div>
            <div className={"flex w-full flex-col items-center justify-around gap-8"}>
              <div
                className={
                  "relative flex h-[180px] w-[300px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-background"
                }
              >
                {image ? (
                  <>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className={"pointer-events-none h-full object-cover"}
                    />
                    <XCircle
                      className={"absolute right-2 top-2 cursor-pointer text-primary"}
                      onClick={handleClearFile}
                    />
                  </>
                ) : (
                  <>
                    <Image className={"size-14 text-primary"} strokeWidth={0.75} />
                    No Picture Selected!
                  </>
                )}
              </div>
              <div>
                <Label className={"text-lg"}>Select A Picture</Label>
                <Input
                  id="picture"
                  type="file"
                  className={"cursor-pointer"}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <Button className={"w-[200px]"}>Enlist Car</Button>
        </div>

        <div className={"flex w-full flex-col gap-6 rounded-2xl bg-card p-10"}>
          <p className={"text-3xl"}>Enlist A Part</p>
          <div className={"flex flex-row items-start gap-8"}>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Select A Make</Label>
              <DropDown
                data={makes}
                placeholder={"make"}
                value={make}
                setValue={setMake}
                widthClassName={"w-56"}
              />
            </div>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Select A Model</Label>
              <DropDown
                data={models}
                placeholder={"model"}
                value={model}
                setValue={setModel}
                widthClassName={"w-56"}
                disabled={true}
              />
            </div>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Enter Name</Label>
              <Input type={"text"} placeholder={"e.g. Brake & Wheel Hub"} className={"w-56"} />
            </div>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Enter Price</Label>
              <Input type={"text"} placeholder={"e.g. 60"} className={"w-56"} />
            </div>
            <Button className={"ml-auto mr-40 w-[200px] self-end"}>Add Part</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
