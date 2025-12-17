import React from "react";
import { GiGraduateCap } from "react-icons/gi";
import { Link } from "react-router";

const Logo = ({ className = "", iconSize=0, ...props }) => {
  return (
    <Link to="/">
      <div
        {...props}
        className={`font-semibold flex items-center gap-1 
          m-0 p-0 
          ${className}`}
      >
        <span>TutionBD</span>
        <GiGraduateCap color="#188bfe" size={iconSize}></GiGraduateCap>
      </div>
    </Link>
  );
};

export default Logo;
