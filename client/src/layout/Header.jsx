import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.jsx";
import { cn } from "@/lib/utils.js";
import { Link } from "react-router-dom";
import { header, popover } from "@/constants/HeaderData.js";
import { BaggageClaim, LayoutDashboard, LogOut, User, UserRound, UsersRound } from "lucide-react";
import { Separator } from "@/components/ui/separator.jsx";
import { ModeToggle } from "@/hooks/ModeToggle.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar.jsx";

const Header = ({ path }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const renderHeader = !["/login", "/signup"].includes(path);

  if (!renderHeader) return null;

  const iconMapping = {
    Profile: <UserRound className={"text-green-500"} />,
    Dashboard: <LayoutDashboard className={"text-blue-500"} />,
    "Rented Cars": <BaggageClaim className={"text-primary"} />,
    Users: <UsersRound className={"text-red-600"} />
  };

  return (
    <header
      className={
        "fixed top-0 z-50 flex h-20 w-full flex-row items-center justify-between border-b border-card px-20 backdrop-blur-xl"
      }
    >
      <Link to={"/"}>
        <div
          className={
            "mt-1 h-[65px] w-[200px] bg-[url('./src/assets/logo.png')] bg-contain bg-center bg-no-repeat"
          }
        />
      </Link>
      <div className={"flex flex-row items-center justify-center gap-10"}>
        <NavigationMenu>
          <NavigationMenuList className={"gap-2"}>
            {header.map((item, index) => (
              <NavigationMenuLink
                asChild
                key={index}
                className={cn("cursor-pointer", navigationMenuTriggerStyle())}
              >
                <Link to={item.href} className={"bg-transparent"}>
                  {item.name}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {isLoggedIn ? (
          <div className={"flex flex-row gap-2"}>
            <Menubar className={"border-none bg-transparent"}>
              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={"cursor-pointer border-accent bg-transparent"}
                  >
                    <div className={"flex flex-row items-center justify-center gap-4"}>
                      <Avatar className={"size-7"}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>FZ</AvatarFallback>
                      </Avatar>
                      <p>FalconiZzare</p>
                    </div>
                  </Button>
                </MenubarTrigger>
                <MenubarContent
                  align={"center"}
                  className={"flex flex-col items-center gap-3 border-card bg-background px-6 py-4"}
                >
                  {popover.map((item, index) => (
                    <MenubarItem asChild className={"focus:bg-transparent"}>
                      <Link to={item.href} className={"bg-transparent"} key={index}>
                        <Button
                          variant={"outline"}
                          className={"w-[200px] justify-start gap-5 border-card pl-8"}
                        >
                          {iconMapping[item.name]}
                          {item.name}
                        </Button>
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Button
              variant={"outline"}
              className={"border-accent bg-transparent"}
              onClick={() => setIsLoggedIn(false)}
            >
              <LogOut className={"ml-1 size-5"} />
            </Button>
          </div>
        ) : (
          <div className={"flex flex-row items-center justify-center gap-4"}>
            <User className={"text-primary"} />
            <Link to={"/login"} className={"duration-150 ease-in-out hover:text-primary"}>
              Log In
            </Link>
            <Separator orientation={"vertical"} className={"h-[20px] bg-accent"} />
            <Link to={"/signup"} className={"duration-150 ease-in-out hover:text-primary"}>
              Register
            </Link>
          </div>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
