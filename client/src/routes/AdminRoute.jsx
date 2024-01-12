import { useEffect } from "react";
import { getLocalStorageItem } from "@/utils/utils.js";
import { useUserQuery } from "@/hooks/use-api.js";
import Loader from "@/components/Loader.jsx";
import NotFound from "@/layout/NotFound.jsx";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const AdminRoute = ({ element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const id = getLocalStorageItem("x-user-id");

  const { data, isLoading, isError } = useUserQuery(id);

  useEffect(() => {
    if (!id || isError) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [id, isError]);

  if (isLoading)
    return (
      <div className={"mt-24 flex h-[500px] w-full items-center justify-center"}>
        <Loader />
      </div>
    );

  if (data && data?.data?.data.roleId !== 1)
    return <NotFound message={"You are unauthorized to view this page!"} />;

  return data && element;
};

AdminRoute.propTypes = {
  element: PropTypes.node.isRequired
};

export default AdminRoute;
