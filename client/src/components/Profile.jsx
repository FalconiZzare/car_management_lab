import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { AlertTriangle, CheckCircle, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import Loader from "@/components/Loader.jsx";
import NotFound from "@/layout/NotFound.jsx";
import { fetchUserQuery } from "@/App.jsx";
import { UserKeyMappings } from "@/constants/UserKeys.js";
import { getAvatarFallback, getLocalStorageItem } from "@/utils/utils.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/api/auth.js";
import { toast } from "sonner";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const id = getLocalStorageItem("x-user-id");
  const { isError, isLoading, data } = fetchUserQuery(id);
  const keysToDisplay = ["fname", "lname", "username", "email", "role"];
  const user = data?.data.data;
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(() => {
    const initialFormData = {};
    keysToDisplay.forEach((key) => {
      if (key !== "role") initialFormData[key] = user ? user[key] : "";
    });

    initialFormData.password = "";

    return initialFormData;
  });

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => {
        const updatedFormData = {};
        keysToDisplay.forEach((key) => {
          if (key !== "role") {
            updatedFormData[key] = user[key];
          }
        });
        return {
          ...prevFormData,
          ...updatedFormData
        };
      });
    }
  }, [user]);

  const handleChange = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value
    }));
  };

  const initials = user && getAvatarFallback(`${user.fname} ${user.lname}`);

  const { mutate: updateUserInfo, isPending } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: () => {
      const userFormData = new FormData();

      Object.keys(formData).forEach((key) => {
        userFormData.append(key, formData[key]);
      });

      return updateUser(id, userFormData);
    },
    onSuccess: (data) => {
      toast(data?.data.message, {
        icon: <CheckCircle className={"size-5 text-green-500"} />
      });
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      setIsEdit(false);
    },
    onError: (error) => {
      toast(error?.response?.data?.message, {
        icon: <AlertTriangle className={"size-5 text-red-500"} />
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo();
  };

  if (isError) return <NotFound message={"User Not Found!"} />;

  return (
    <div className={"mt-24"}>
      <form>
        <div
          className={
            "mx-[4rem] mb-4 flex h-[600px] flex-col items-center justify-center gap-10 rounded-2xl bg-card p-10"
          }
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Avatar
                className="group relative size-28 cursor-pointer select-none"
                onClick={() => setIsEdit(!isEdit)}
              >
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <div
                  className={
                    "absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 opacity-0 transition-opacity group-hover:opacity-100"
                  }
                >
                  <Pencil className="size-12 text-primary" />
                </div>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className={"grid grid-cols-2 gap-x-12 gap-y-12"}>
                {keysToDisplay.map((originalKey, index) => {
                  const key = UserKeyMappings[originalKey] || originalKey;
                  return (
                    <div key={index} className={"flex flex-col gap-3"}>
                      <Label>{key}</Label>
                      {isEdit && originalKey !== "role" ? (
                        <Input
                          type={"text"}
                          defaultValue={formData[originalKey]}
                          required
                          onChange={(e) => handleChange(originalKey, e.target.value)}
                          className={"w-56"}
                        />
                      ) : (
                        <div
                          className={
                            "flex h-10 w-56 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                          }
                        >
                          <p className={"mt-[1px]"}>{user[originalKey]}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
                {isEdit && (
                  <div className={"flex flex-col gap-3"}>
                    <Label>Password</Label>
                    <Input
                      type={"password"}
                      className={"w-56"}
                      placeholder={"Enter New Password"}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                  </div>
                )}
                <div className={"col-span-2 flex flex-col"}>
                  {isEdit && (
                    <Button type={"submit"} onClick={handleSubmit} disabled={isPending}>
                      {isPending ? (
                        <Loader size={"30"} color={"hsl(var(--foreground))"} />
                      ) : (
                        "Update Information"
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
