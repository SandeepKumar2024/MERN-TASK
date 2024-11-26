import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.scss";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: " ",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v2/auth/signup",
        formData
      );
      setSuccess("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to sign up. Please try again."
      );
    }
  };

  return (
    <div className="lgContr">
      <h1>Sign Up</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="user">
            <span>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Enter your username..."
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="email">
            <span>Email</span>
            <input
              type="text"
              name="email"
              placeholder="Email....."
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="password">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="other">
          <span>Already have an account?</span>

          <Link to="/login" style={{ textDecoration: "none", color: "white" }} className="link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
