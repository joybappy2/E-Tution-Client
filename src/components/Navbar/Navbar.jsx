import React from "react";
import { IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";

const Navbar = () => {
  const user = true;

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
        <div className="flex items-center ml-1 md:ml-2 md:scale-110">
          <Logo className="md:scale-125 md:ml-4" />
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
          <div className="dropdown dropdown-end flex items-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring hover:ring-primary/30 transition"
            >
              <div className="w-9 sm:w-10 rounded-full">
                <img
                  alt="avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
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
              top-7
              "
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a className="text-error">Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <Button className="bg-[#5289ff27] btn-sm">Login</Button>
            <Button className="btn-primary btn-sm">Register</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
