import { NavLink, Outlet } from "react-router";
import Button from "../../../components/Button/Button";
import { MdDashboard } from "react-icons/md";

const StudentDashboard = () => {
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
            <h1 className="text-2xl md:text-3xl font-bold">
              Student Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your tuitions and activities
            </p>
          </div>
          <h3 className="font-semibold mb-4">Menu</h3>

          <ul className="flex flex-col gap-2">
            {/* ------ Link 1 ----- */}
            <NavLink to="/dashboard/student" end>
              {({ isActive }) => (
                <Button
                  className={`
        w-full justify-start gap-2
        ${isActive ? "btn-primary text-white" : "bg-secondary"}
      `}
                >
                  <MdDashboard></MdDashboard>
                  Dashboard
                </Button>
              )}
            </NavLink>

            {/* ------ Link 2 ----- */}
            <NavLink to="/dashboard/student/my-tutions" end>
              {({ isActive }) => (
                <Button
                  className={`
        w-full justify-start gap-2
        ${isActive ? "btn-primary text-white" : "bg-secondary"}
      `}
                >
                  <MdDashboard></MdDashboard>
                  My Tutions
                </Button>
              )}
            </NavLink>

            {/* ------ Link 3 ----- */}
            <NavLink to="/dashboard/student/post-tution" end>
              {({ isActive }) => (
                <Button
                  className={`
        w-full justify-start gap-2
        ${isActive ? "btn-primary text-white" : "bg-secondary"}
      `}
                >
                  <MdDashboard></MdDashboard>
                  Post Tution
                </Button>
              )}
            </NavLink>

            {/* ------ Link 4 ----- */}
            <NavLink to="/dashboard/student/applied-tutors" end>
              {({ isActive }) => (
                <Button
                  className={`
        w-full justify-start gap-2
        ${isActive ? "btn-primary text-white" : "bg-secondary"}
      `}
                >
                  <MdDashboard></MdDashboard>
                  Applied Tutors
                </Button>
              )}
            </NavLink>

            {/* ------ Link 5 ----- */}
            <NavLink to="/dashboard/student/payments" end>
              {({ isActive }) => (
                <Button
                  className={`
        w-full justify-start gap-2
        ${isActive ? "btn-primary text-white" : "bg-secondary"}
      `}
                >
                  <MdDashboard></MdDashboard>
                  Payments
                </Button>
              )}
            </NavLink>

            {/* ------ Link 6 ----- */}
            <NavLink to="/dashboard/student/settings" end>
              {({ isActive }) => (
                <Button
                  className={`
        w-full justify-start gap-2
        ${isActive ? "btn-primary text-white" : "bg-secondary"}
      `}
                >
                  <MdDashboard></MdDashboard>
                  Profile Settings
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

export default StudentDashboard;
