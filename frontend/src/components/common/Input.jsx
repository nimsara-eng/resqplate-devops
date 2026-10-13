function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  const inputId = props.id || name;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId}>
          {label}

          {required && (
            <span aria-hidden="true"> *</span>
          )}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : undefined
        }
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;