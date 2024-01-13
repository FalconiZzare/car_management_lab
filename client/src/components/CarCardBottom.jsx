import { useContext, useState } from "react";
import { Separator } from "@/components/ui/separator.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.jsx";
import PaymentMethod from "@/components/PaymentMethod.jsx";
import { UserContext } from "@/App.jsx";
import { getLocalStorageItem } from "@/utils/utils.js";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addRent } from "@/api/rent.js";

const CarCardBottom = ({ id, make, model, rent, isRented }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const localId = getLocalStorageItem("x-user-id");
  const { user } = useContext(UserContext);
  const { mutate, isPending } = useMutation({
    mutationKey: ["addRent"],
    mutationFn: () => {
      const formData = new FormData();
      formData.append("userId", localId);
      formData.append("carId", id);

      return new Promise((resolve) => {
        setTimeout(() => {
          const result = addRent(formData);
          resolve(result);
        }, 2000);
      });
    },
    onSuccess: (data) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });
      setOpen(false);
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  const authNotif = () => {
    toast("Please login first.", {
      icon: <AlertTriangle className={"size-5 text-red-500"} />,
      action: {
        label: "Log In",
        onClick: () => navigate("/login")
      }
    });
  };

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
              {localId && user ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button disabled={isRented}>Rent</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <PaymentMethod amount={rent} fnToExecute={mutate} loading={isPending} />
                  </DialogContent>
                </Dialog>
              ) : (
                <Button disabled={isRented} onClick={authNotif}>
                  Rent
                </Button>
              )}
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
