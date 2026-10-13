function Alert({
  message,
  type = "info",
  onClose,
  className = "",
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`alert alert-${type} ${className}`}
      role="alert"
    >
      <span>{message}</span>

      {onClose && (
        <button
          type="button"
          className="alert-close"
          onClick={onClose}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default Alert;