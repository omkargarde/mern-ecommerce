import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo?.isAdmin) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
export default AdminRoute;
