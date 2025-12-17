import React from "react";
import useRole from "../hooks/useRole";

const TeacherRoute = ({ children }) => {
  const role = useRole();
  console.log(role);

  if (!role) {
    return null;
  }

  if (role !== "teacher") {
    return <p>Forbidden Access Only For Teachers</p>;
  }

  return children;
};

export default TeacherRoute;
