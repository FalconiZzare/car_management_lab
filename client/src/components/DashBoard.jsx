import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import DropDown from "@/components/DropDown.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { AlertTriangle, CheckCircle, Image, XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar, addMake } from "@/api/car.js";
import { toast } from "sonner";
import Loader from "@/components/Loader.jsx";
import { addPart } from "@/api/part.js";
import { useMakeQuery, useModelQuery } from "@/hooks/use-api.js";

const DashBoard = () => {
  const [make, setMake] = useState("");

  const [carMake, setCarMake] = useState("");
  const [carMakeId, setCarMakeId] = useState(null);
  const [carModel, setCarModel] = useState("");
  const [carRent, setCarRent] = useState("");
  const [carState, setCarState] = useState("");
  const [image, setImage] = useState(null);

  const [partMake, setPartMake] = useState("");
  const [partMakeId, setPartMakeId] = useState(null);
  const [partModel, setPartModel] = useState("");
  const [partName, setPartName] = useState("");
  const [partPrice, setPartPrice] = useState("");

  const queryClient = useQueryClient();

  const { makeData, makeDataLoading } = useMakeQuery();

  const { modelData, modelDataLoading, refetchModels } = useModelQuery(partMakeId);

  const { mutate: handleAddMake, isPending: makeLoading } = useMutation({
    mutationKey: ["addMake"],
    mutationFn: () => {
      const formData = new FormData();
      formData.append("make", make);

      return addMake(formData);
    },
    onSuccess: (data) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });
      setMake("");
      queryClient.invalidateQueries({ queryKey: ["getMakes"] });
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  const { mutate: handleAddCar, isPending: carLoading } = useMutation({
    mutationKey: ["addCar"],
    mutationFn: (formData) => {
      return addCar(formData);
    },
    onSuccess: (data) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });

      setCarMake("");
      setCarMakeId(null);
      setCarModel("");
      setCarRent("");
      setCarState("");
      handleClearFile();
      queryClient.invalidateQueries({ queryKey: ["getModels"] });
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  const { mutate: handleAddPart, isPending: partLoading } = useMutation({
    mutationKey: ["addPart"],
    mutationFn: (formData) => {
      return addPart(formData);
    },
    onSuccess: (data) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });

      setPartMake("");
      setPartMakeId(null);
      setPartModel("");
      setPartName("");
      setPartPrice("");
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  const handlePartSubmit = () => {
    if (!partMakeId) {
      toast("Part make is required!", {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });

      return;
    }

    const formData = new FormData();
    formData.append("makeId", partMakeId);
    formData.append("model", partModel);
    formData.append("name", partName);
    formData.append("price", partPrice);

    handleAddPart(formData);
  };

  const handleCarSubmit = () => {
    if (!carMakeId) {
      toast("Car make is required!", {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });

      return;
    }
    if (!image) {
      toast("Car image is required!", {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });

      return;
    }
    const formData = new FormData();
    formData.append("makeId", carMakeId);
    formData.append("model", carModel);
    formData.append("rent", carRent);
    formData.append("state", carState);
    formData.append("images", image);

    handleAddCar(formData);
  };

  const processSetCarMake = (make) => {
    if (!make) {
      setCarMakeId(undefined);
      setCarMake("");
      return;
    }
    const filteredMake = makeData?.data?.data.filter(
      (data) => data.make.toLowerCase() === make.toLowerCase()
    );

    setCarMakeId(filteredMake[0].id);
    setCarMake(make);
  };

  const processSetPartMake = (make) => {
    if (!make) {
      setPartMakeId(undefined);
      setPartMake("");
      return;
    }
    const filteredMake = makeData?.data?.data.filter(
      (data) => data.make.toLowerCase() === make.toLowerCase()
    );

    setPartMakeId(filteredMake[0].id);
    setPartMake(make);
  };

  useEffect(() => {
    if (partMakeId) refetchModels();
  }, [partMakeId]);

  const handleClearFile = () => {
    setImage(null);
    document.getElementById("picture").value = "";
  };

  return (
    <div className={"mt-24"}>
      <div className={"mx-[4rem] mb-8 flex flex-col items-start justify-start gap-[4rem] pt-6"}>
        <div className={"flex w-full flex-col gap-6 rounded-2xl bg-card p-10"}>
          <p className={"text-3xl"}>Add A Make</p>
          <form
            className={"flex items-center justify-start gap-4"}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddMake();
            }}
          >
            <Input
              type={"text"}
              placeholder={"e.g. Mercedes BenZ"}
              value={make}
              className={"w-56"}
              onChange={(e) => setMake(e.target.value)}
              required
            />
            <Button type={"submit"} className={"w-28"} disabled={makeLoading}>
              {makeLoading ? <Loader size={"30"} color={"hsl(var(--foreground))"} /> : "Add Make"}
            </Button>
          </form>
        </div>

        <div className={"flex w-full flex-col items-center gap-10 rounded-2xl bg-card p-10"}>
          <div className={"flex w-full items-center gap-6"}>
            <div className={" flex flex-col items-start gap-6"}>
              <p className={"text-3xl"}>Enlist A Car</p>
              <div className={"flex flex-col items-start justify-start gap-8"}>
                <div className={"flex items-end gap-6"}>
                  <div className={"flex flex-col justify-center gap-2"}>
                    <Label className={"text-lg"}>Select A Make*</Label>
                    {makeDataLoading ? (
                      <div
                        className={
                          " flex h-10 w-56 items-center justify-center rounded-md border border-input bg-background"
                        }
                      >
                        <Loader size={"30"} color={"hsl(var(--foreground))"} />
                      </div>
                    ) : (
                      <DropDown
                        data={makeData ? makeData?.data?.data?.map((item) => item.make) : []}
                        placeholder={"make"}
                        value={carMake}
                        setValue={processSetCarMake}
                        widthClassName={"w-56"}
                      />
                    )}
                  </div>
                  <div className={"flex flex-col justify-center gap-2"}>
                    <Label className={"text-lg"}>Enter Model*</Label>
                    <Input
                      type={"text"}
                      placeholder={"e.g. EQB Sedan"}
                      className={"w-56"}
                      required
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                    />
                  </div>
                  <div className={"flex flex-col justify-center gap-2"}>
                    <Label className={"text-lg"}>Enter Rent*</Label>
                    <Input
                      type={"text"}
                      placeholder={"e.g. 6300"}
                      className={"w-56"}
                      value={carRent}
                      onChange={(e) => setCarRent(e.target.value)}
                    />
                  </div>
                </div>
                <div className={"flex w-full flex-col justify-center gap-2"}>
                  <Label className={"text-lg"}>Enter Details About Car Condition</Label>
                  <Textarea
                    placeholder={"e.g. Looks like new with 300 miles travel distance"}
                    onChange={(e) => setCarState(e.target.value)}
                  />
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
                <Label className={"text-lg"}>Select A Picture*</Label>
                <Input
                  id="picture"
                  type="file"
                  className={"cursor-pointer"}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
          </div>
          <Button className={"w-[200px]"} disabled={carLoading} onClick={handleCarSubmit}>
            {carLoading ? <Loader size={"30"} color={"hsl(var(--foreground))"} /> : "Enlist Car"}
          </Button>
        </div>

        <div className={"flex w-full flex-col gap-6 rounded-2xl bg-card p-10"}>
          <p className={"text-3xl"}>Enlist A Part</p>
          <div className={"flex flex-row items-start gap-8"}>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Select A Make</Label>
              {makeDataLoading ? (
                <div
                  className={
                    " flex h-10 w-56 items-center justify-center rounded-md border border-input bg-background"
                  }
                >
                  <Loader size={"30"} color={"hsl(var(--foreground))"} />
                </div>
              ) : (
                <DropDown
                  data={makeData ? makeData?.data?.data?.map((item) => item.make) : []}
                  placeholder={"make"}
                  value={partMake}
                  setValue={processSetPartMake}
                  widthClassName={"w-56"}
                />
              )}
            </div>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Select A Model</Label>
              <DropDown
                data={modelData ? modelData?.data?.data?.map((item) => item.model) : []}
                placeholder={"model"}
                value={partModel}
                setValue={setPartModel}
                widthClassName={"w-56"}
                disabled={!partMakeId || !partMake || modelDataLoading}
              />
            </div>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Enter Name</Label>
              <Input
                type={"text"}
                placeholder={"e.g. Brake & Wheel Hub"}
                className={"w-56"}
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
              />
            </div>
            <div className={"flex flex-col justify-center gap-2"}>
              <Label className={"text-lg"}>Enter Price</Label>
              <Input
                type={"text"}
                placeholder={"e.g. 60"}
                className={"w-56"}
                value={partPrice}
                onChange={(e) => setPartPrice(e.target.value)}
              />
            </div>
            <Button
              className={"ml-auto mr-40 w-[200px] self-end"}
              disabled={partLoading}
              onClick={handlePartSubmit}
            >
              {partLoading ? <Loader size={"30"} color={"hsl(var(--foreground))"} /> : "Add Part"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
