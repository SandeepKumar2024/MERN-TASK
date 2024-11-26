import React, { useState } from "react";
import axios from "axios";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
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

    try {
      const response = await axios.post("http://localhost:5000/api/v2/auth/login", formData);

      // Store admin info in localStorage
      localStorage.setItem("adminInfo", JSON.stringify(response.data));

      // Navigate or perform any post-login actions
      window.location.href = "/dashboard";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="lgContr">
      <h1>Login</h1>
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
          <button type="submit">Sign In</button>
        </form>
        
        <div className="other">
          <span>Don't have an account ? </span>
           <Link to="/signup" style={{textDecoration:"none",color:"white"}} className="link" >Sign up</Link>
         
        </div>
        {error && <p className="error" style={{color:"red"}}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
