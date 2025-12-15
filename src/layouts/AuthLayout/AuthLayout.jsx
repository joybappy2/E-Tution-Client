import React from "react";
import { Outlet } from "react-router";
import Logo from "../../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <Logo className="text-4xl"></Logo>

      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
