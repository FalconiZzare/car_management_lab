import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Redo2 } from "lucide-react";

const RentList = () => {
  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[4rem] mb-4 flex flex-col items-start justify-start gap-8 rounded-2xl bg-card p-10"
        }
      >
        <div>
          <p className={"text-5xl font-bold tracking-wider"}>Your Rent List</p>
          <p className={"text-md mt-3"}>Please return the car at your earliest convenience.</p>
        </div>
        <div className={"w-full rounded-2xl border border-background"}>
          <Table>
            <TableHeader>
              <TableRow className={"border-background hover:bg-transparent"}>
                <TableHead>Car ID</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Rent Date</TableHead>
                <TableHead className={"text-center"}>Return</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((item, index) => (
                <TableRow key={index} className={"h-[74px] border-background hover:bg-transparent"}>
                  <TableCell>{index}</TableCell>
                  <TableCell>Lamborghini</TableCell>
                  <TableCell>Huracan Evo Spyder</TableCell>
                  <TableCell>2023-12-19</TableCell>
                  <TableCell className={"text-center"}>
                    <Button
                      variant={"outline"}
                      onClick={() => console.log("Added")}
                      className={
                        "group gap-2 border border-foreground bg-card transition duration-300 ease-in-out hover:bg-background"
                      }
                    >
                      <Redo2
                        className={
                          "mb-1 transition duration-300 ease-in-out group-hover:text-primary"
                        }
                      />
                      Return
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RentList;
