import React from "react";
import { IoMdMenu } from "react-icons/io";
import { Link, NavLink } from "react-router";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, loadingUser, logout } = useAuth();
  const role = useRole();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/tutions">Tutions</NavLink>
      </li>
      <li>
        <NavLink to="/tutors">Tutors</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
    </>
  );

  // ------HANDLE LOGOUT--------
  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("Logout Successful");
      })
      .catch((err) => {
        console.log(err.code);
      });
  };

  return (
    <div className="navbar sticky top-0 z-20 bg-base-100 shadow-sm px-3 sm:px-4 lg:px-6">
      <div className="navbar-start flex items-center gap-0">
        <div className="flex items-center">
          <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content flex items-center">
            <label
              htmlFor="my-drawer-5"
              className="drawer-button btn btn-ghost p-2 flex items-center justify-center lg:hidden hover:bg-base-200 transition"
            >
              <IoMdMenu size={24} />
            </label>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-5"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul
              className="menu bg-base-100 min-h-screen w-64 sm:w-72 p-4 gap-1
            [&_a:active]:bg-primary [&_a:active]:text-white"
            >
              {links}
            </ul>
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center ml-1 md:ml-2">
          <Logo className="text-2xl md:text-3xl w-fit" />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex items-center">
        <ul
          className="menu menu-horizontal gap-1
        [&_a:active]:bg-primary [&_a:active]:text-white"
        >
          {links}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-2 sm:gap-4">
        {user ? (
          <div
            title={user.email}
            className={`dropdown dropdown-end flex items-center `}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary/30 transition"
            >
              <div className="w-9 sm:w-10 rounded-full hover:scale-105 transition-all duration-200">
                <img alt="avatar" src={`${user.photoURL}`} />
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
                <a>Profile</a>
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
        ) : (
          <div>
            {loadingUser ? (
              <span className="loading loading-infinity text-primary loading-xl"></span>
            ) : (
              <div className="flex items-center gap-2 sm:gap-4">
                <Link to="/login">
                  <Button className="bg-[#5289ff27] btn-sm md:btn-md">
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <Button className="btn-primary btn-sm md:btn-md">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
