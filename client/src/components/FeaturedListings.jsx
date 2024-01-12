import { useNavigate } from "react-router-dom";
import CarCardBottom from "@/components/CarCardBottom.jsx";
import { useCarsMutation } from "@/hooks/use-api.js";
import { useEffect } from "react";
import Loader from "@/components/Loader.jsx";
import { base_image_url } from "@/utils/utils.js";

const FeaturedListings = () => {
  const navigate = useNavigate();
  const { carsData, carsLoading, carsMutate } = useCarsMutation();

  useEffect(() => {
    carsMutate();
  }, []);

  return (
    <div>
      <div className={"mb-[3rem] flex flex-col gap-3"}>
        <p className={"text-2xl font-medium tracking-normal text-primary"}>Handy Picked</p>
        <p className={"text-5xl font-bold tracking-wider"}>Featured Listings</p>
      </div>
      <div className="grid grid-cols-4 gap-x-6">
        {carsLoading ? (
          <div className={"col-span-4 mb-10 flex h-56 w-full items-center justify-center"}>
            <Loader />
          </div>
        ) : (
          carsData?.data?.data.map((item, index) => (
            <div
              key={index}
              className={`relative mb-6 flex flex-col items-center justify-start overflow-hidden rounded-2xl border border-ring bg-card dark:border-accent ${
                index === 0 ? "col-span-2 row-span-2" : "col-span-1 h-[350px]"
              } group cursor-pointer`}
              onClick={() => navigate(`/cars/details/${item.id}`)}
            >
              <div
                className={" h-full w-full select-none duration-300 ease-in group-hover:scale-110"}
              >
                <img
                  src={`${base_image_url}/${item.photo}`}
                  alt={item.model}
                  className={"pointer-events-none h-full object-cover"}
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
  );
};

export default FeaturedListings;
