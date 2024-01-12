import { useEffect } from "react";
import { getLocalStorageItem } from "@/utils/utils.js";
import { useUserQuery } from "@/hooks/use-api.js";
import Loader from "@/components/Loader.jsx";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const id = getLocalStorageItem("x-user-id");
  const navigate = useNavigate();
  const location = useLocation();

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

  return data && element;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired
};

export default PrivateRoute;
