import React from "react";
import useRole from "../hooks/useRole";

const TeacherRoute = ({ children }) => {
  const role = useRole();
  console.log(role);

  return children;
};

export default TeacherRoute;
