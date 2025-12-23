import React from "react";
import useRole from "../hooks/useRole";

const TeacherRoute = ({ children }) => {
  const role = useRole();

  if (!role) {
    return null;
  }

  if (role !== "tutor") {
    return <p>Forbidden Access Only For Teachers</p>;
  }

  return children;
};

export default TeacherRoute;
