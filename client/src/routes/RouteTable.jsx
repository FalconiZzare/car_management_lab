import { Route, Routes } from "react-router-dom";
import Login from "@/components/Login.jsx";
import Signup from "@/components/Signup.jsx";

const RouteTable = () => {
  return (
    <>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
      </Routes>
    </>
  );
};

export default RouteTable;
