import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Shield, Trash, User } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar.jsx";

const Users = () => {
  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[8rem] mb-4 flex flex-col items-start justify-start gap-8 rounded-2xl bg-card p-10"
        }
      >
        <div>
          <p className={"text-5xl font-bold tracking-wider"}>List Of All Users</p>
          <p className={"text-md mt-3"}>You can update role of a user or delete one.</p>
        </div>
        <div className={"w-full rounded-2xl border border-background"}>
          <Table>
            <TableHeader>
              <TableRow className={"border-background hover:bg-transparent"}>
                <TableHead>User ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className={"text-center"}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((item, index) => (
                <TableRow key={index} className={"h-[74px] border-background hover:bg-transparent"}>
                  <TableCell>{index}</TableCell>
                  <TableCell>Talat</TableCell>
                  <TableCell>Mahmud</TableCell>
                  <TableCell>FalconiZzare</TableCell>
                  <TableCell>talat@octopi.ai</TableCell>
                  <TableCell className={"flex w-[170px] text-center"}>
                    <Menubar className={"border-none bg-transparent"}>
                      <MenubarMenu>
                        <MenubarTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={
                              "mr-3 cursor-pointer gap-2 border-foreground bg-transparent hover:bg-background"
                            }
                          >
                            {index % 2 === 0 ? (
                              <>
                                <Shield className={"size-5 text-primary"} />
                                Admin
                              </>
                            ) : (
                              <>
                                <User className={"size-5 text-green-500"} />
                                Client
                              </>
                            )}
                          </Button>
                        </MenubarTrigger>
                        <MenubarContent
                          align={"center"}
                          className={
                            "flex flex-col items-center border-background bg-card px-3 py-2"
                          }
                        >
                          <MenubarItem className={"focus:bg-transparent"}>
                            <Button
                              variant={"outline"}
                              className={
                                "w-[150px] cursor-pointer justify-start gap-5 border-background bg-transparent pl-8 hover:bg-background"
                              }
                            >
                              <Shield className={"size-5 text-primary"} />
                              Admin
                            </Button>
                          </MenubarItem>
                          <MenubarItem className={"focus:border-none focus:bg-transparent"}>
                            <Button
                              variant={"outline"}
                              className={
                                "w-[150px] cursor-pointer justify-start gap-5 border-background bg-transparent pl-8 hover:bg-background"
                              }
                            >
                              <User className={"size-5 text-green-500"} />
                              Client
                            </Button>
                          </MenubarItem>
                        </MenubarContent>
                      </MenubarMenu>
                    </Menubar>
                    <Button
                      variant={"outline"}
                      className={"gap-2 border-destructive bg-transparent hover:bg-destructive"}
                    >
                      <Trash className={"size-5"} />
                      Delete
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

export default Users;
