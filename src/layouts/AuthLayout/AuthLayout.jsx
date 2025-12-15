import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h2>Auth Layout</h2>

      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
