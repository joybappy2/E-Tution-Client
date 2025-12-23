import React from "react";
import useRole from "../hooks/useRole";

const StudentRoute = ({ children }) => {
  const role = useRole();

  if (!role) {
    return null;
  }

  if (role !== "student") {
    return <p>Forbidden Access Only For Student</p>;
  }

  return children;
};

export default StudentRoute;
