import { Outlet } from "react-router";
import Logo from "../../components/Logo/Logo";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen px-4 py-6">
      <Logo className="text-2xl md:text-3xl"></Logo>
      <h2>Dashboard Layout</h2>

      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
