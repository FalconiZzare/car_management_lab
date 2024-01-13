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
import { CheckCircle, Fingerprint, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.jsx";
import PaymentMethod from "@/components/PaymentMethod.jsx";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getParts } from "@/api/part.js";
import Loader from "@/components/Loader.jsx";
import { useState } from "react";
import { toast } from "sonner";

const Servicing = () => {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const { id: carId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["getParts"],
    queryFn: () => getParts(carId)
  });

  const handleAddCart = (id) => {
    const newCart = [...cart];
    const item = data?.data?.data.find((item) => item.id === id);
    const cartItem = newCart.find((item) => item.id === id);

    if (cartItem) newCart[newCart.indexOf(cartItem)].quantity++;
    else
      newCart.push({
        ...item,
        itemNo: newCart.length + 1,
        quantity: 1
      });

    setCart(newCart);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    cart.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });

    return totalPrice;
  };

  const handleCheckout = () => {
    setCart([]);
    setOpen(false);
    toast("Thanks for your purchase!", {
      icon: <CheckCircle className={"size-5 text-green-500"} />
    });
  };

  return (
    <div className={"mb-6 flex flex-col gap-12"}>
      <CarDetails carId={parseInt(carId)} />
      <div className={"mx-[8rem] flex flex-row items-start justify-between gap-5"}>
        <div className={"flex w-6/12 flex-col gap-8"}>
          <p className={"text-5xl font-bold tracking-wider"}>Available Parts</p>
          <div className={"max-w-[800px] rounded-2xl border border-card"}>
            {isLoading ? (
              <div className={"mt-3 flex h-[300px] items-center justify-center self-center"}>
                <Loader />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className={"border-card hover:bg-transparent"}>
                    <TableHead>Part ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className={"text-right"}>Action</TableHead>
                  </TableRow>
                </TableHeader>
                {data?.data?.data.length === 0 ? (
                  <TableFooter className={"border-card bg-transparent"}>
                    <TableRow className={"h-[74px] border-background hover:bg-transparent"}>
                      <TableCell colSpan={6} className={"text-center"}>
                        No Parts available!
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                ) : (
                  <TableBody>
                    {data?.data?.data.map((item) => (
                      <TableRow
                        key={item.id}
                        className={"h-[74px] border-card hover:bg-transparent"}
                      >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{`$ ${item.price}`}</TableCell>
                        <TableCell className={"text-right"}>
                          <Button variant={"ghost"} onClick={() => handleAddCart(item.id)}>
                            <ShoppingCart />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            )}
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
              {cart.length === 0 ? (
                <TableFooter className={"border-card bg-transparent"}>
                  <TableRow className={"h-[74px] border-background hover:bg-transparent"}>
                    <TableCell colSpan={6} className={"text-center"}>
                      Cart is empty!
                    </TableCell>
                  </TableRow>
                </TableFooter>
              ) : (
                <>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow
                        key={item.id}
                        className={"h-[74px] border-card hover:bg-transparent"}
                      >
                        <TableCell>{item.itemNo}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className={"text-center"}>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter className={"border-card bg-transparent"}>
                    <TableRow className={"border-card hover:bg-transparent"}>
                      <TableCell>Total</TableCell>
                      <TableCell>{`$${calculateTotalPrice()}`}</TableCell>
                      <TableCell className={"text-center"}>
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <Button variant={"ghost"} className={"gap-4"}>
                              <Fingerprint className={"text-lg"} />
                              Checkout
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <PaymentMethod
                              amount={calculateTotalPrice()}
                              fnToExecute={handleCheckout}
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </>
              )}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicing;
