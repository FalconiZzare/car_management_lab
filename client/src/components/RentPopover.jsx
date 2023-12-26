import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import PaymentMethod from "@/components/PaymentMethod.jsx";

const RentPopover = ({ disabled }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Rent</Button>
      </DialogTrigger>
      <DialogContent>
        <PaymentMethod />
      </DialogContent>
    </Dialog>
  );
};

RentPopover.propTypes = {
  disabled: PropTypes.bool.isRequired
};

export default RentPopover;
