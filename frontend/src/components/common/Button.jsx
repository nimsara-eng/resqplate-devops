function Button({
  children,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;