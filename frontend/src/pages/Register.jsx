import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register as registerRequest } from "../services/authService";

import "./style/Register.css";

/* REVIEW: Browser constraints provide basic UX validation only. Keep server
 * validation authoritative, but add consistent client feedback and tests for
 * duplicate email, malformed input, loading, and retry behavior. */
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  // Submit registration data and redirect to login after success.
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerRequest(formData);

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-background register-background-left"></div>
      <div className="register-background register-background-right"></div>

      <section className="register-container">
        {/* Page heading */}
        <div className="register-header">
          <div className="register-logo">P</div>

          <span className="register-eyebrow">
            Get started
          </span>

          <h1>Create Account</h1>

          <p>
            Create your ProFlow account and start managing
            your business.
          </p>
        </div>

        {/* Registration form */}
        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          <div className="register-form-group">
            <label htmlFor="register-name">
              Name
            </label>

            <input
              id="register-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />
          </div>

          {/* Email */}
          <div className="register-form-group">
            <label htmlFor="register-email">
              Email
            </label>

            <input
              id="register-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="register-form-group">
            <label htmlFor="register-password">
              Password
            </label>

            <input
              id="register-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength="6"
              autoComplete="new-password"
              required
            />

            <span className="register-password-hint">
              Password must contain at least 6 characters.
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="register-error"
              role="alert"
            >
              <span className="register-error-icon">
                !
              </span>

              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="register-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="register-spinner"></span>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Login redirect */}
        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;