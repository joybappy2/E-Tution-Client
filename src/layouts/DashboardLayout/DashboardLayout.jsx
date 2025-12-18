import { NavLink, Outlet } from "react-router";
import Logo from "../../components/Logo/Logo";

const DashboardLayout = () => {
  return (
    <div>
      <div className="flex items-center justify-between bg-base-100 shadow-sm px-4 py-3">
        {/* Left: Logo / Brand */}
        <Logo className="text-2xl md:text-3xl"></Logo>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          {/* Avatar */}
          <div className="avatar">
            <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.pravatar.cc/150?img=3" alt="User" />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen px-4 py-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
