import { Separator } from "@/components/ui/separator.jsx";
import RentPopover from "@/components/RentPopover.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CarCardBottom = ({ id, make, model, rent, isRented }) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "absolute bottom-0 flex h-[120px] w-full flex-col items-start justify-center gap-3 bg-card p-4"
      }
    >
      <p className={"text-lg font-semibold leading-none tracking-wide"}>
        <span className={"font-bold text-primary"}>{make}</span> {model}
      </p>
      <Separator className={"bg-accent dark:bg-background"} />
      <div className={"flex w-full flex-row items-center justify-between"}>
        <p className={"text-2xl font-medium"}>{`$${rent}`}</p>
        <div className={"flex flex-row gap-4"}>
          <div className={isRented ? "cursor-no-drop" : undefined}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <RentPopover disabled={isRented} />
            </div>
          </div>
          <Button
            variant={"outline"}
            className={"border-ring bg-transparent hover:bg-background"}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/cars/servicing/${id}`);
            }}
          >
            Servicing
          </Button>
        </div>
      </div>
    </div>
  );
};

CarCardBottom.propTypes = {
  id: PropTypes.number.isRequired,
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  rent: PropTypes.number.isRequired,
  isRented: PropTypes.bool.isRequired
};

export default CarCardBottom;
