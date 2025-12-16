import React from "react";
import { Outlet } from "react-router";
import Logo from "../../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      <Logo className="text-2xl md:text-3xl w-fit" />
      <main className="mt-2">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayout;
