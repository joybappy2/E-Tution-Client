import { NavLink, Outlet } from "react-router";
import Button from "../../../components/Button/Button";
import { MdDashboard } from "react-icons/md";
import { MdPayments, MdSettings } from "react-icons/md";
import { FaBookOpen, FaClipboardList, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="">
      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:min-h-screen">
        {/* Sidebar */}
        <aside
          className="
        lg:col-span-3
        bg-base-100
        rounded-xl
        shadow-sm
        p-4
      "
        >
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage platform and users
            </p>
          </div>

          <h3 className="font-semibold mb-4">Menu</h3>

          <ul className="flex flex-col gap-2">
            {/* Dashboard */}
            <NavLink to="/dashboard/admin" end>
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <MdDashboard size={18} />
                  Dashboard
                </Button>
              )}
            </NavLink>

            {/* Manage Users */}
            <NavLink to="/dashboard/admin/manage-users">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <FaUsers size={16} />
                  Manage Users
                </Button>
              )}
            </NavLink>

            {/* Manage Tuitions */}
            <NavLink to="/dashboard/admin/manage-tutions">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <FaBookOpen size={16} />
                  Manage Tuitions
                </Button>
              )}
            </NavLink>

            {/* Report & Analytics */}
            <NavLink to="/dashboard/admin/manage-reports">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <FaBookOpen size={16} />
                  Reports & Analytics
                </Button>
              )}
            </NavLink>

            {/* Tutor Requests */}
            <NavLink to="/dashboard/admin/tutor-requests">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <FaClipboardList size={16} />
                  Tutor Requests
                </Button>
              )}
            </NavLink>

            {/* Payments */}
            <NavLink to="/dashboard/admin/payments">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <MdPayments size={18} />
                  Payments
                </Button>
              )}
            </NavLink>

            {/* Settings */}
            <NavLink to="/dashboard/admin/settings">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <MdSettings size={18} />
                  Platform Settings
                </Button>
              )}
            </NavLink>
          </ul>
        </aside>

        {/* Content Area */}
        <section
          className="
        lg:col-span-9
        bg-base-100
        rounded-xl
        shadow-sm
        p-4 sm:p-6
      "
        >
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
