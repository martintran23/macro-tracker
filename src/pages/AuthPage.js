import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import InputField from "../components/InputField";

import { loginUser, registerUser } from "../services/userApi";
import { getApiErrorMessage } from "../utils/apiErrors";

function AuthPage({ setIsAuthenticated, setUserAccount }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const trimmed = email.trim();
      if (!trimmed) {
        setErrorMessage("Please enter your email.");
        return;
      }
      const result =
        mode === "signup" ? await registerUser(trimmed) : await loginUser(trimmed);
      setUserAccount({ email: result.email, userId: result.userId });
      setIsAuthenticated(true);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page auth-page">
      <Card>
        <div className="auth-header">
          <h1 className="page-title">Welcome, Titan</h1>
          <p className="hero-text compact">
            Build your personalized Bayesian nutrition and workout plan, styled for the CSUF community.
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
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Please wait..." : mode === "login" ? "Continue" : "Create Account"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default AuthPage;
