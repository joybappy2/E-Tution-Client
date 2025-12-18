const Button = ({ children, className = "", ...props }) => {
  return (
    <button
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
    </button>
  );
};

export default Button;
