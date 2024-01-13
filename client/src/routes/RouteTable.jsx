import { Route, Routes, useLocation } from "react-router-dom";
import Login from "@/components/Login.jsx";
import Signup from "@/components/Signup.jsx";
import Home from "@/components/Home.jsx";
import Header from "@/layout/Header.jsx";
import Footer from "@/layout/Footer.jsx";
import Cars from "@/components/Cars.jsx";
import CarDetails from "@/components/CarDetails.jsx";
import Servicing from "@/components/Servicing.jsx";
import Profile from "@/components/Profile.jsx";
import RentList from "@/components/RentList.jsx";
import Users from "@/components/Users.jsx";
import DashBoard from "@/components/DashBoard.jsx";
import NotFound from "@/layout/NotFound.jsx";
import AdminRoute from "@/routes/AdminRoute.jsx";
import PrivateRoute from "@/routes/PrivateRoute.jsx";

const RouteTable = () => {
  const location = useLocation();

  return (
    <>
      <Header path={location.pathname} />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/cars"} element={<Cars />} />
        <Route path={"/cars/details/:id"} element={<CarDetails />} />
        <Route path={"/cars/servicing/:id"} element={<Servicing />} />
        <Route path={"/profile"} element={<PrivateRoute element={<Profile />} />} />
        <Route path={"/rent/list/:id"} element={<PrivateRoute element={<RentList />} />} />
        <Route path={"/users"} element={<AdminRoute element={<Users />} />} />
        <Route path={"/admin"} element={<AdminRoute element={<DashBoard />} />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
      <Footer path={location.pathname} />
    </>
  );
};

export default RouteTable;
