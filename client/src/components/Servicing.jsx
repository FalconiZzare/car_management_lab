import CarDetails from "@/components/CarDetails.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.jsx";
import { parts } from "@/constants/DemoData.js";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.jsx";
import PaymentMethod from "@/components/PaymentMethod.jsx";

const Servicing = () => {
  return (
    <div className={"mb-6 flex flex-col gap-12"}>
      <CarDetails />
      <div className={"mx-[8rem] flex flex-row items-start justify-between gap-5"}>
        <div className={"flex w-6/12 flex-col gap-8"}>
          <p className={"text-5xl font-bold tracking-wider"}>Available Parts</p>
          <div className={"max-w-[800px] rounded-2xl border border-card"}>
            <Table>
              <TableHeader>
                <TableRow className={"border-card hover:bg-transparent"}>
                  <TableHead>Part ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className={"text-right"}>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts.map((item) => (
                  <TableRow key={item.id} className={"h-[74px] border-card hover:bg-transparent"}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{`$ ${item.price}`}</TableCell>
                    <TableCell className={"text-right"}>
                      <Button variant={"ghost"} onClick={() => console.log("Added")}>
                        <ShoppingCart />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className={"flex w-6/12 flex-col gap-8"}>
          <p className={"text-5xl font-bold tracking-wider"}>Cart</p>
          <div className={"max-w-[800px] rounded-2xl border border-card"}>
            <Table>
              <TableHeader>
                <TableRow className={"border-card hover:bg-transparent"}>
                  <TableHead>Item No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className={"text-center"}>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts.map((item) => (
                  <TableRow key={item.id} className={"h-[74px] border-card hover:bg-transparent"}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className={"text-center"}>{3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className={"border-card bg-transparent"}>
                <TableRow className={"border-card hover:bg-transparent"}>
                  <TableCell className={"text-center"}>Total</TableCell>
                  <TableCell className={"text-center"}>$ 1395</TableCell>
                  <TableCell className={"text-center"}>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"ghost"} className={"gap-4 text-lg"}>
                          <ShoppingCart />
                          Checkout
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <PaymentMethod />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicing;
