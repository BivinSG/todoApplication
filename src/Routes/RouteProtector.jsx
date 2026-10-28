import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RouteProtector = ({ role }) => {
  const { auth } = useSelector((state) => state?.authState || {});

  return (
    <>
      {auth?.accessToken && Number(auth?.role) === Number(role) ? (
        <Outlet />
      ) : auth?.accessToken && Number(auth?.role) !== Number(role) ? (
        <Navigate to="/unauthorized" />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default RouteProtector;
