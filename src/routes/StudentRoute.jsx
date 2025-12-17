import React from "react";
import useRole from "../hooks/useRole";

const StudentRoute = ({ children }) => {
  const role = useRole();
  console.log(role);

  return children;
};

export default StudentRoute;
