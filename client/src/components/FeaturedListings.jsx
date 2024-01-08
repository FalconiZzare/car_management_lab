import { useNavigate } from "react-router-dom";
import CarCardBottom from "@/components/CarCardBottom.jsx";
import Evo from "@/assets/evo-spyder.jpg";

const FeaturedListings = () => {
  const navigate = useNavigate();
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
            onClick={() => navigate("/cars/details/1")}
          >
            <div
              className={
                " h-full w-full bg-[url('./src/assets/evo-spyder.jpg')] bg-cover bg-center bg-no-repeat duration-300 ease-in group-hover:scale-110"
              }
            >
              <img src={Evo} alt={"Evo"} className={"h-full object-cover"} />
            </div>
            <CarCardBottom index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedListings;
