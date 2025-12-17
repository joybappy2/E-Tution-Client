import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/register"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
