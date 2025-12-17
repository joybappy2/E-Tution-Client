import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const role = useRole();
  console.log(role);

  if (role !== "admin") {
    return <p>Forbidden Access</p>;
  }

  return children;
};

export default AdminRoute;
