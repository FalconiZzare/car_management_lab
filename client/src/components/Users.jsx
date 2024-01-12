import { useEffect, useState } from "react";
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
import { AlertTriangle, CheckCircle, Shield, Trash, User } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUser, getUsers, updateUserRole } from "@/api/auth.js";
import NotFound from "@/layout/NotFound.jsx";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem } from "@/utils/utils.js";
import Loader from "@/components/Loader.jsx";
import { toast } from "sonner";
import { useUserQuery } from "@/hooks/use-api.js";

const Users = () => {
  const navigate = useNavigate();
  const id = getLocalStorageItem("x-user-id");
  const { isError: isUserError, isLoading: isUserLoading, data: userData } = useUserQuery(id);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getUsers"],
    queryFn: () => getUsers(),
    retry: 1,
    enabled: false
  });

  const [users, setUsers] = useState(data?.data.data);

  const { mutate: updateRole } = useMutation({
    mutationKey: ["updateUserRole"],
    mutationFn: (variables) => {
      const { id, roleId } = variables;

      const formData = new FormData();
      formData.append("roleId", roleId);

      return updateUserRole(id, formData);
    },
    onSuccess: (data, variables) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });

      const { id, roleId } = variables;

      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          if (user.id === id) {
            return { ...user, roleId: roleId };
          }
          return user;
        });
      });
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  const { mutate: deleteUserById } = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id) => {
      return deleteUser(id);
    },
    onSuccess: (data, id) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });

      setUsers((prevUsers) => {
        return prevUsers.filter((user) => user.id !== id);
      });
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id || isUserError) navigate("/login");
      else {
        await refetch();
      }
    };

    fetchData();
  }, [id, isUserLoading]);

  useEffect(() => {
    if (data) setUsers(data?.data.data);
  }, [data]);

  if (!isUserLoading && userData?.data.data.roleId !== 1) {
    return <NotFound message={"You are not authorized to view this page!"} />;
  }

  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[4rem] mb-4 flex flex-col items-start justify-start gap-8 rounded-2xl bg-card p-10"
        }
      >
        {isUserLoading || isLoading ? (
          <div className={"mt-3 flex h-[450px] items-center justify-center self-center"}>
            <Loader />
          </div>
        ) : (
          <>
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
                {users?.length === 0 ? (
                  <TableFooter className={"border-card bg-transparent"}>
                    <TableRow className={"h-[74px] border-background hover:bg-transparent"}>
                      <TableCell colSpan={6} className={"text-center"}>
                        Table is empty!
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                ) : (
                  <TableBody>
                    {users?.map((item) => (
                      <TableRow
                        key={item.id}
                        className={"h-[74px] border-background hover:bg-transparent"}
                      >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.fname}</TableCell>
                        <TableCell>{item.lname}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell className={"flex w-[170px] text-center"}>
                          <Menubar className={"border-none bg-transparent"}>
                            <MenubarMenu>
                              <MenubarTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={
                                    "mr-3 w-28 cursor-pointer gap-2 border-foreground bg-transparent hover:bg-background"
                                  }
                                >
                                  {item.roleId === 1 ? (
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
                                  "flex flex-col items-center border-foreground bg-card px-3 py-2"
                                }
                              >
                                <MenubarItem className={"focus:bg-transparent"}>
                                  <Button
                                    variant={"outline"}
                                    className={
                                      "w-[150px] cursor-pointer justify-start gap-5 border-foreground bg-transparent pl-8 hover:bg-background"
                                    }
                                    onClick={() => updateRole({ id: item.id, roleId: 1 })}
                                  >
                                    <Shield className={"size-5 text-primary"} />
                                    Admin
                                  </Button>
                                </MenubarItem>
                                <MenubarItem className={"focus:border-none focus:bg-transparent"}>
                                  <Button
                                    variant={"outline"}
                                    className={
                                      "w-[150px] cursor-pointer justify-start gap-5 border-foreground bg-transparent pl-8 hover:bg-background"
                                    }
                                    onClick={() => updateRole({ id: item.id, roleId: 2 })}
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
                            className={
                              "gap-2 border-destructive bg-transparent hover:bg-destructive"
                            }
                            onClick={() => deleteUserById(item.id)}
                          >
                            <Trash className={"size-5"} />
                            Delete
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

export default Users;
