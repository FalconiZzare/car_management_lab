import { Route, Routes, useLocation } from "react-router-dom";
import Login from "@/components/Login.jsx";
import Signup from "@/components/Signup.jsx";
import Home from "@/components/Home.jsx";
import Header from "@/layout/Header.jsx";

const RouteTable = () => {
  const location = useLocation();

  return (
    <>
      <Header path={location.pathname} />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
      </Routes>
    </>
  );
};

export default RouteTable;
