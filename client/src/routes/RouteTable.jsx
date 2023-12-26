import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "@/components/Login.jsx";
import Signup from "@/components/Signup.jsx";
import Home from "@/components/Home.jsx";
import Header from "@/layout/Header.jsx";
import Footer from "@/layout/Footer.jsx";
import Cars from "@/components/Cars.jsx";
import CarDetails from "@/components/CarDetails.jsx";
import Servicing from "@/components/Servicing.jsx";

const RouteTable = () => {
  const location = useLocation();

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  };

  return (
    <>
      <ScrollToTop />
      <Header path={location.pathname} />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/cars"} element={<Cars />} />
        <Route path={"/cars/details/:id"} element={<CarDetails />} />
        <Route path={"/cars/servicing/:id"} element={<Servicing />} />
      </Routes>
      <Footer path={location.pathname} />
    </>
  );
};

export default RouteTable;
