import { Link, useNavigate } from "react-router-dom";
import { header } from "@/constants/HeaderData.js";
import { Dot, Facebook, Instagram, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator.jsx";
import { Button } from "@/components/ui/button.jsx";

const Footer = ({ path }) => {
  const navigate = useNavigate();
  const renderHeader = !["/login", "/signup"].includes(path);

  if (!renderHeader) return null;

  return (
    <footer
      className={
        "z-50 flex w-full flex-col justify-center gap-6 rounded-t-2xl border-t border-card px-[8rem] py-6"
      }
    >
      <div className={"flex flex-row items-center justify-between"}>
        <Link to={"/"}>
          <div
            className={
              "mt-1 h-[90px] w-[200px] bg-[url('./src/assets/logo.png')] bg-contain bg-center bg-no-repeat"
            }
          />
        </Link>
        <div>
          {header.map((item, index) => (
            <div key={index} className={"flex flex-row items-center justify-start gap-2"}>
              <Dot className={"size-8 text-primary"} />
              <p
                onClick={() => navigate(item.href)}
                className={"cursor-pointer duration-150 ease-in-out hover:text-primary"}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <h1 className={"w-96 font-light"}>
          Award-winning, family owned dealership and rentals of new and pre-owned vehicles with
          several locations across the city. Lowest prices and the best customer service guaranteed.
        </h1>
        <div className={"flex flex-col items-end gap-3"}>
          <h1 className={"text-3xl font-bold"}>
            +88 <span className={"text-primary"}>01739-527825</span>
          </h1>
          <p className={"text-lg font-light"}>support@mayerdua.com</p>
          <div className={"flex flex-col items-end text-lg font-light"}>
            <p>Block B, Plot 69420</p>
            <p>Bashundhara R/A, Dhaka</p>
          </div>
        </div>
      </div>
      <Separator className={"bg-card"} />
      <div className={"fle-row flex items-center justify-between"}>
        <h1>
          Copyright © 2024. All rights reserved.{" "}
          <span className={"cursor-pointer underline"}>Privacy Policy</span>
        </h1>
        <div className={"flex flex-row gap-4"}>
          <Button variant={"outline"} className={"size-[40px] rounded-[50%] border-accent"}>
            <Facebook className={"scale-[3.2]"} />
          </Button>
          <Button variant={"outline"} className={"size-[40px] rounded-[50%] border-accent"}>
            <Instagram className={"scale-[3.2]"} />
          </Button>
          <Button variant={"outline"} className={"size-[40px] rounded-[50%] border-accent"}>
            <Twitter className={"scale-[3.2]"} />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
