import React from "react";
import { NavLink, Outlet } from "react-router";
import Button from "../../../components/Button/Button";
import { MdDashboard } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClipboardList,
} from "react-icons/fa";

const TeacherDashboard = () => {
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
            <h1 className="text-2xl md:text-3xl font-bold">Tutor Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your tution applications and earnings
            </p>
          </div>
          <h3 className="font-semibold mb-4">Menu</h3>

          <ul className="flex flex-col gap-2">
            {/* Dashboard */}
            <NavLink to="/dashboard/tutor" end>
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

            {/* My Tuitions */}
            <NavLink to="/dashboard/tutor/my-applications">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <FaBookOpen size={16} />
                  My Applications
                </Button>
              )}
            </NavLink>

            {/* Post Tution */}
            <NavLink to="/dashboard/tutor/on-going-tutions">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <FaChalkboardTeacher size={16} />
                  Ongoing Tutions
                </Button>
              )}
            </NavLink>

            {/* Applied Tutors */}
            <NavLink to="/dashboard/tutor/revenue-history">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <FaClipboardList size={16} />
                  Revenue History
                </Button>
              )}
            </NavLink>

            {/* Profile Settings */}
            <NavLink to="/dashboard/tutor/settings">
              {({ isActive }) => (
                <Button
                  className={`w-full justify-start gap-2 ${
                    isActive ? "btn-primary text-white" : "bg-secondary"
                  }`}
                >
                  <MdSettings size={18} />
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

export default TeacherDashboard;
