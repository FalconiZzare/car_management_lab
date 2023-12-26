import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.jsx";
import { cn } from "@/lib/utils.js";
import { Link } from "react-router-dom";
import { header } from "@/constants/HeaderData.js";
import { User } from "lucide-react";
import { Separator } from "@/components/ui/separator.jsx";
import { ModeToggle } from "@/hooks/ModeToggle.jsx";

const Header = ({ path }) => {
  const renderHeader = !["/login", "/signup"].includes(path);

  if (!renderHeader) return null;

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
          <NavigationMenuList className={"gap-5"}>
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
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
