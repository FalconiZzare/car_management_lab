import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.jsx";
import { Button } from "@/components/ui/button.jsx";
import { AlertTriangle, CheckCircle, Redo2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRent, getRents } from "@/api/rent.js";
import Loader from "@/components/Loader.jsx";
import { getLocalStorageItem } from "@/utils/utils.js";
import { format } from "date-fns";
import { toast } from "sonner";

const RentList = () => {
  const id = getLocalStorageItem("x-user-id");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getRents"],
    queryFn: () => getRents(id)
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteRent"],
    mutationFn: (id) => deleteRent(id),
    onSuccess: (data) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });
      queryClient.invalidateQueries({ queryKey: ["getRents"] });
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[4rem] mb-4 flex flex-col items-start justify-start gap-8 rounded-2xl bg-card p-10"
        }
      >
        {isLoading ? (
          <div className={"mt-3 flex h-[450px] items-center justify-center self-center"}>
            <Loader />
          </div>
        ) : (
          <>
            <div>
              <p className={"text-5xl font-bold tracking-wider"}>Your Rent List</p>
              <p className={"text-md mt-3"}>Please return the car at your earliest convenience.</p>
            </div>
            <div className={"w-full rounded-2xl border border-background"}>
              <Table>
                <TableHeader>
                  <TableRow className={"border-background hover:bg-transparent"}>
                    <TableHead>Rent ID</TableHead>
                    <TableHead>Make</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Rent Date</TableHead>
                    <TableHead className={"text-center"}>Action</TableHead>
                  </TableRow>
                </TableHeader>
                {data?.data?.data.length === 0 ? (
                  <TableFooter className={"border-card bg-transparent"}>
                    <TableRow className={"h-[74px] border-background hover:bg-transparent"}>
                      <TableCell colSpan={6} className={"text-center"}>
                        Table is empty!
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                ) : (
                  <TableBody>
                    {data?.data?.data.map((item) => (
                      <TableRow
                        key={item.id}
                        className={"h-[74px] border-background hover:bg-transparent"}
                      >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.make}</TableCell>
                        <TableCell>{item.model}</TableCell>
                        <TableCell>{format(item.rentDate, "yyyy-MM-dd")}</TableCell>
                        <TableCell className={"text-center"}>
                          <Button
                            variant={"outline"}
                            onClick={() => mutate(item.id)}
                            className={
                              "gap-2 border border-foreground bg-card transition duration-300 ease-in-out hover:bg-background hover:text-primary"
                            }
                          >
                            <Redo2 className={"mb-1"} />
                            Return
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RentList;
