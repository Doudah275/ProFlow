import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./style/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Update the corresponding form field when the user enters data.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Submit login credentials and redirect after successful authentication.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    console.log("=================================");
    console.log("FRONTEND LOGIN");
    console.log("Email:", formData.email);
    console.log("Password entered:", formData.password ? "YES" : "NO");

    try {
      const result = await login(formData);

      console.log("LOGIN RESULT:", result);

      console.log("LOGIN SUCCESS");

      navigate("/dashboard");
    } catch (error) {
      console.log("=================================");
      console.log("LOGIN ERROR");
      console.log("Error object:", error);
      console.log("Status:", error.response?.status);
      console.log("Response data:", error.response?.data);
      console.log("Message:", error.message);
      console.log("=================================");

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-container">
        {/* Page introduction */}
        <div className="login-header">
          <span className="login-eyebrow">Welcome back</span>

          <h1>Sign in to ProFlow</h1>

          <p>
            Access your workspace and manage your business
            efficiently.
          </p>
        </div>

        {/* Login form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={loading}
              required
            />
          </div>

          <div className="login-field">
            <div className="login-label-row">
              <label htmlFor="password">Password</label>
            </div>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div
              className="login-error"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Registration link */}
        <p className="login-register">
          Don't have an account?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;