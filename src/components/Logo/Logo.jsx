import React from "react";
import { GiGraduateCap } from "react-icons/gi";
import { Link } from "react-router";

const Logo = ({ className = "", ...props }) => {
  return (
    <Link
      to="/"
      {...props}
      className={`text-xl font-semibold flex items-center gap-1 ${className}`}
    >
      <span>TutionBD</span>
      <GiGraduateCap color="#2563eb" size={25}></GiGraduateCap>
    </Link>
  );
};

export default Logo;
