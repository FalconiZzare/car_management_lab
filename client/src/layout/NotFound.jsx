import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { MoveLeft } from "lucide-react";
import Error404 from "@/assets/404.png";

const NotFound = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className={"mt-24 select-none"}>
      <div
        className={
          "mx-[8rem] mb-4 flex flex-col items-center justify-center gap-20 rounded-2xl bg-card py-24"
        }
      >
        <h1 className={"text-4xl font-medium"}>
          {message ? `Sorry? ${message}` : "Oops! Page Not Found!"}
        </h1>
        <img src={Error404} alt={"404.png"} className={"pointer-events-none w-[650px]"} />
        <div className={"flex items-center justify-center gap-4"}>
          <Button className={"w-[100px]"} onClick={() => navigate("/")}>
            Home
          </Button>
          <Button
            variant={"outline"}
            className={"w-[160px] gap-4 duration-300 ease-in-out hover:text-primary"}
            onClick={() => navigate(-1)}
          >
            <MoveLeft />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
