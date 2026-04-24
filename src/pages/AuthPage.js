import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import InputField from "../components/InputField";

function AuthPage({ setIsAuthenticated, setUserAccount }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserAccount({ email });
    setIsAuthenticated(true);
  };

  return (
    <div className="page auth-page">
      <Card>
        <div className="auth-header">
          <h1 className="page-title">Welcome to MacroTracker</h1>
          <p className="hero-text compact">
            Build your personalized Bayesian nutrition and workout plan in a few steps.
          </p>
        </div>

        <div className="auth-toggle">
          <button
            type="button"
            className={mode === "login" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form className="input-form auth-form" onSubmit={handleSubmit}>
          <InputField
            id="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
          <Button type="submit">{mode === "login" ? "Continue" : "Create Account"}</Button>
        </form>
      </Card>
    </div>
  );
}

export default AuthPage;
