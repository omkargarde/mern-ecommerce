import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
export default PrivateRoute;
