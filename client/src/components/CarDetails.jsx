import { Separator } from "@/components/ui/separator.jsx";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader.jsx";
import NotFound from "@/layout/NotFound.jsx";
import { base_image_url } from "@/utils/utils.js";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { getCar } from "@/api/car.js";

const CarDetails = ({ carId }) => {
  const { id } = useParams();
  const {
    data: detailsData,
    isError: detailsError,
    isLoading: detailsLoading,
    error: errorData
  } = useQuery({
    queryKey: ["getCarDetails"],
    queryFn: () => getCar(carId || id)
  });

  if (detailsLoading)
    return (
      <div className={"mt-24 flex h-[500px] w-full items-center justify-center"}>
        <Loader />
      </div>
    );

  if (detailsError) return <NotFound message={errorData?.response.data.message} />;

  return (
    detailsData && (
      <div className={"mt-24"}>
        <div
          className={
            "mx-[4rem] mb-4 flex h-[700px] select-none flex-row items-center justify-around rounded-2xl bg-card p-10"
          }
        >
          <div
            className={
              "flex max-h-[500px] w-[800px] items-center justify-center overflow-hidden rounded-2xl"
            }
          >
            <img
              src={`${base_image_url}/${detailsData?.data.data.photo}`}
              alt={detailsData?.data.data.model}
              className={"pointer-events-none w-full"}
            />
          </div>
          <div className={"flex w-4/12 flex-col items-start gap-6"}>
            <p className={"text-3xl font-extralight"}>
              <span className={"text-primary"}>{detailsData?.data.data.make}</span>{" "}
              {detailsData?.data.data.model}
            </p>
            <Separator className={"bg-background"} />
            <p className={"self-start text-4xl font-medium"}>{`$${detailsData?.data.data.rent}`}</p>
            <div className={"flex w-full flex-col gap-4 rounded-xl border border-background p-6"}>
              {Object.keys(detailsData?.data.data).map(
                (key, index) =>
                  key !== "photo" && (
                    <div key={index} className={"flex flex-row items-start justify-start gap-12"}>
                      <p className={"min-w-[60px] capitalize"}>
                        {(key === "state" ? "condition" : key) + ":"}
                      </p>
                      <p className={"capitalize"}>
                        {key === "rent"
                          ? `$${detailsData?.data.data[key]} Per Day`
                          : detailsData?.data.data[key]}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

CarDetails.propTypes = {
  carId: PropTypes.number
};

export default CarDetails;
