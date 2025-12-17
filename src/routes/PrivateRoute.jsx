import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate to="/register"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
