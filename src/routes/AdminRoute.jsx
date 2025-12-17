import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const role = useRole();
  console.log(role);

  if (!role) {
    return null;
  }

  if (role !== "admin") {
    return <p>Forbidden Access Only For Admin</p>;
  }

  return children;
};

export default AdminRoute;
