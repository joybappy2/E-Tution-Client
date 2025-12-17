import React from "react";
import useRole from "../hooks/useRole";

const StudentRoute = ({ children }) => {
  const role = useRole();
  console.log(role);

  if(role !== 'student') {
    return <p>Forbidden Access</p>
  }

  return children;
};

export default StudentRoute;
