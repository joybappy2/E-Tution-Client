const Button = ({ children, className = "", ...props }) => {
  return (
    <div
      {...props}
      className={`
          btn
          hover:brightness-110
          hover:shadow-lg
          active:scale-95
          transition-all duration-200
          ${className}
        `}
    >
      {children}
    </div>
  );
};

export default Button;
