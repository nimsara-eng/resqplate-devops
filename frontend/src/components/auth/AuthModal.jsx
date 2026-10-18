import { useState } from "react";
import Modal from "../common/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./Auth.css";

export default function AuthModal({
  isOpen,
  onClose,
  onLogin,
  onSignup
}) {
  const [mode, setMode] = useState("login");

  if (!isOpen) {
    return null;
  }

  const title =
    mode === "login"
      ? "Welcome back"
      : "Join ResQPlate";

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="auth-container">
        <p className="auth-description">
          {mode === "login"
            ? "Log in to manage food donations and reservations."
            : "Create an account to provide or collect surplus food."}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Log In
          </button>

          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm onSubmit={onLogin} />
        ) : (
          <SignupForm onSubmit={onSignup} />
        )}
      </div>
    </Modal>
  );
}