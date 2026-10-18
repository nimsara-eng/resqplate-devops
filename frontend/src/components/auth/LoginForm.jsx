import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");

    onSubmit(formData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label htmlFor="login-email">Email address</label>

        <input
          id="login-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="login-password">Password</label>

        <input
          id="login-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="auth-submit">
        Log In
      </button>
    </form>
  );
}