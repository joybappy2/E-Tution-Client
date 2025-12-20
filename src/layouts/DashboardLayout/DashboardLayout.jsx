import { NavLink, Outlet } from "react-router";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const DashboardLayout = () => {
  const { user, handleLogout } = useAuth();
  const role = useRole();

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
          <div
            title={user?.email}
            className={`dropdown dropdown-end flex items-center `}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary/30 transition"
            >
              <div className="w-9 sm:w-10 rounded-full hover:scale-105 transition-all duration-200">
                <img alt="avatar" src={`${user?.photoURL}`} />
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content
              bg-base-100
              rounded-box
              z-50 mt-3 w-52 p-2
              shadow-sm
              [&_a:active]:bg-primary 
              [&_a:active]:text-white
              top-11
              "
            >
              <li className="">
                <p className="">{user?.email}</p>
              </li>

              <li>
                <a>
                  Profile <span className="text-gray-500">({role})</span>
                </a>
              </li>
              <li>
                <NavLink to={`/dashboard/${role && role}`}>Dashboard</NavLink>
              </li>
              <li>
                <a>Settings</a>
              </li>

              {/* -----REGISTER FORM-------- */}
              <li onClick={handleLogout}>
                <a className="text-error">Logout</a>
              </li>
            </ul>
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
