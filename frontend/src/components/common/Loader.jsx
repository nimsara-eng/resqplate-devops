function Loader({
  text = "Loading...",
  className = "",
}) {
  return (
    <div
      className={`loader ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className="loader-spinner"
        aria-hidden="true"
      />

      <span>{text}</span>
    </div>
  );
}

export default Loader;