import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Search } from "lucide-react";
import DropDown from "@/components/DropDown.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { useNavigate } from "react-router-dom";
import CarCardBottom from "@/components/CarCardBottom.jsx";
import { useCarsMutation, useMakeQuery, useModelQuery } from "@/hooks/use-api.js";
import Loader from "@/components/Loader.jsx";
import { base_image_url } from "@/utils/utils.js";

const Cars = () => {
  const [make, setMake] = useState("");
  const [makeId, setMakeId] = useState(null);
  const [model, setModel] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { makeData, makeDataLoading } = useMakeQuery();
  const { modelData, modelDataLoading, refetchModels } = useModelQuery(makeId);
  const { carsData, carsLoading, carsMutate } = useCarsMutation(make, model, search);

  const processSetMake = (make) => {
    if (!make) {
      setMakeId(undefined);
      setMake("");
      return;
    }
    const filteredMake = makeData?.data?.data.filter(
      (data) => data.make.toLowerCase() === make.toLowerCase()
    );

    setMakeId(filteredMake[0].id);
    setMake(make);
  };

  useEffect(() => {
    if (makeId) refetchModels();
  }, [makeId]);

  useEffect(() => {
    carsMutate();
  }, []);

  const handleSearch = () => {
    if (!make && !model && !search) return;

    carsMutate();
  };

  const handleReset = () => {
    setSearch("");
    setMake("");
    setModel("");

    carsMutate();
  };

  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[4rem] mb-8 flex flex-row items-center justify-center gap-10 rounded-2xl bg-card py-10"
        }
      >
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
            value={make}
            setValue={processSetMake}
            widthClassName={"w-[220px]"}
          />
        )}
        <DropDown
          data={modelData ? modelData?.data?.data?.map((item) => item.model) : []}
          placeholder={"model"}
          value={model}
          setValue={setModel}
          widthClassName={"w-[220px]"}
          disabled={!makeId || !make || modelDataLoading}
        />
        <Separator orientation={"vertical"} className={"h-[50px] w-[2px] bg-background"} />
        <div className="flex w-full max-w-xl items-center space-x-2">
          <Input
            type="text"
            placeholder="Search by car name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant={"outline"}
            className={"gap-2 text-primary hover:border-primary"}
            onClick={handleSearch}
          >
            <Search />
            Search
          </Button>
          <Button
            variant={"outline"}
            className={"gap-2 text-primary hover:border-primary"}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
      <div className={"mx-[4rem] mb-6 flex flex-col gap-10"}>
        <p className={"text-5xl font-bold tracking-wider"}>Car Gallery</p>
        <div className={"grid grid-cols-4 gap-x-6"}>
          {carsLoading ? (
            <div className={"col-span-4 flex h-96 items-center justify-center"}>
              <Loader />
            </div>
          ) : (
            carsData?.data?.data?.map((item, index) => (
              <div
                key={index}
                className={
                  " group relative col-span-1 mb-6 flex h-[350px] cursor-pointer flex-col items-center justify-start overflow-hidden rounded-2xl border border-ring bg-card dark:border-accent"
                }
                onClick={() => navigate(`/cars/details/${item.id}`)}
              >
                <div
                  className={
                    " h-full w-full select-none duration-300 ease-in group-hover:scale-110"
                  }
                >
                  <img
                    src={`${base_image_url}/${item.photo}`}
                    alt={item.model}
                    className={"pointer-events-none -mt-10 h-full w-full object-cover"}
                  />
                </div>
                <CarCardBottom
                  id={item.id}
                  isRented={!!item.isRented}
                  make={item.make}
                  model={item.model}
                  rent={item.rent}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
