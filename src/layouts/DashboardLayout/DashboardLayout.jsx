import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen px-4 py-6">
      <h2>Dashboard Layout</h2>

      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
