import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import FeaturedListings from "@/components/FeaturedListings.jsx";
import Mosaic from "@/assets/bg-1920-new.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={"mt-20"}>
      <div
        className={
          "flex h-[600px] flex-row items-center justify-between gap-[12rem] rounded-b-2xl bg-card px-[4rem] pb-[4rem]"
        }
      >
        <div className={"flex flex-col items-start justify-center gap-10"}>
          <h1 className={"text-7xl font-[900] capitalize"}>
            Find your <span className={"text-primary"}>perfect</span> car
          </h1>
          <p className={"max-w-[400px] text-xl"}>
            We can help you find the best car. Check our reviews, compare models and find cars for
            rentals.
          </p>
          <Button
            variant={"outline"}
            className={
              "text-md mt-2 h-[50px] w-[150px] border-primary bg-transparent hover:bg-background"
            }
            onClick={() => navigate("/cars")}
          >
            Browse
          </Button>
        </div>
        <div
          className={
            "mt-[4rem] h-[400px] w-[500px] select-none overflow-hidden rounded-2xl shadow-[0_0_15px_1px_rgba(0,0,0,0.40)]"
          }
        >
          <img
            src={Mosaic}
            alt={"mosaic.png"}
            className={"pointer-events-none h-full object-cover"}
          />
        </div>
      </div>
      <div className={"mx-[4rem] mt-[4rem]"}>
        <FeaturedListings />
      </div>
    </div>
  );
};

export default Home;
