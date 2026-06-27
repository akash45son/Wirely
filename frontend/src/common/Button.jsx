const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "w-full px-4 py-2 rounded-[6px] font-medium transition duration-250 ease-in-out cursor-pointer inline-flex items-center justify-center gap-2 text-sm";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover shadow-sm transition-all hover:scale-[1.01]",

    secondary:
      "bg-white text-primary border border-primary/30 hover:bg-primary-light/50 shadow-sm",

    danger:
      "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;