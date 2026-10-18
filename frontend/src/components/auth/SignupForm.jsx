import { useState } from "react";

export default function SignupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "receiver"
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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
    };

    onSubmit(signupData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-field">
        <label htmlFor="signup-name">
          Name / Organization name
        </label>

        <input
          id="signup-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="ABC Canteen"
          autoComplete="name"
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="signup-email">
          Email address
        </label>

        <input
          id="signup-email"
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
        <label htmlFor="signup-role">
          Account type
        </label>

        <select
          id="signup-role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="receiver">
            Community Receiver
          </option>

          <option value="provider">
            Food Provider
          </option>
        </select>
      </div>

      <div className="auth-field">
        <label htmlFor="signup-password">
          Password
        </label>

        <input
          id="signup-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Minimum 8 characters"
          autoComplete="new-password"
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="confirm-password">
          Confirm password
        </label>

        <input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Enter password again"
          autoComplete="new-password"
          required
        />
      </div>

      {error && <p className="auth-error">{error}</p>}

      <button type="submit" className="auth-submit">
        Create Account
      </button>
    </form>
  );
}