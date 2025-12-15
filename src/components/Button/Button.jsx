import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`
          btn
          hover:brightness-110
          hover:shadow-lg
          hover:scale-105
          active:scale-90
          transition-all duration-200
          ${className}
        `}
    >
      {children}
    </button>
  );
};

export default Button;
