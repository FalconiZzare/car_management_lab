import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Pencil } from "lucide-react";
import { user } from "@/constants/DemoData.js";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={"mt-24"}>
      <div
        className={
          "mx-[8rem] mb-4 flex h-[500px] flex-col items-center justify-start gap-10 rounded-2xl bg-card p-10"
        }
      >
        <Avatar
          className="group relative size-28 cursor-pointer"
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
          <AvatarFallback>FZ</AvatarFallback>
        </Avatar>
        <div className={"grid grid-cols-2 gap-x-12 gap-y-12"}>
          {Object.keys(user).map((key, index) => (
            <div key={index} className={"flex flex-col gap-3"}>
              <Label>{key}</Label>
              {isEdit ? (
                <Input type={"text"} defaultValue={user[key]} className={"w-56"} />
              ) : (
                <div
                  className={
                    "flex h-10 w-56 rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                  }
                >
                  <p className={"mt-[1px]"}>{user[key]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {isEdit && <Button>Update</Button>}
      </div>
    </div>
  );
};

export default Profile;
