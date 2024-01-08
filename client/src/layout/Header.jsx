import { useContext } from "react";
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
import { UserContext } from "@/App.jsx";
import { getAvatarFallback, removeLocalStorageItem } from "@/utils/utils.js";
import Logo from "@/assets/logo.png";

const Header = ({ path }) => {
  const { user, setUser } = useContext(UserContext);
  const renderHeader = !["/login", "/signup"].includes(path);

  if (!renderHeader) return null;

  const popoverIconMapping = {
    Profile: <UserRound className={"text-green-500"} />,
    Management: <LayoutDashboard className={"text-blue-500"} />,
    "Rented Cars": <BaggageClaim className={"text-primary"} />,
    "Client List": <UsersRound className={"text-red-600"} />
  };

  const initials = user && getAvatarFallback(`${user.fname} ${user.lname}`);

  return (
    <header
      className={
        "fixed top-0 z-50 flex h-20 w-full flex-row items-center justify-between border-b border-card bg-[hsl(223,10%,14%)] bg-opacity-45 px-16 backdrop-blur-xl"
      }
    >
      <Link to={"/"}>
        <div className={"mt-1 h-[65px] w-[200px]"}>
          <img src={Logo} alt={"logo.png"} className={"pointer-events-none h-full select-none"} />
        </div>
      </Link>
      <div className={"flex flex-row items-center justify-center gap-10"}>
        <NavigationMenu>
          <NavigationMenuList className={"gap-2"}>
            {header.map((item, index) => (
              <NavigationMenuLink
                key={index}
                asChild
                className={cn("cursor-pointer border border-accent", navigationMenuTriggerStyle())}
              >
                <Link to={item.href} className={"bg-transparent"}>
                  {item.name}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {user ? (
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
                        <AvatarImage src="https://github.com/shadcn.png" alt={initials} />
                        <AvatarFallback>{initials}</AvatarFallback>
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
                    <MenubarItem asChild key={index} className={"focus:bg-transparent"}>
                      <Link to={item.href} className={"bg-transparent"}>
                        <Button
                          variant={"outline"}
                          className={"w-[200px] justify-start gap-5 border-card pl-8"}
                        >
                          {popoverIconMapping[item.name]}
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
              onClick={() => {
                removeLocalStorageItem("x-user-id");
                setUser(null);
              }}
            >
              <LogOut className={"ml-1 size-5"} />
            </Button>
          </div>
        ) : (
          <div
            className={
              "flex h-10 flex-row items-center justify-center gap-4 rounded-md border border-accent px-4 py-2 text-sm font-medium"
            }
          >
            <User className={"size-5 text-primary"} />
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
