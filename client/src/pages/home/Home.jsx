import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./home.scss";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/Signup";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="home">
      <div className="bottom">
       Welcome to the HomePage. 
       <span>Please <Link to="/login">Sign in</Link> to continue .</span>
      </div>
    </div>
  );
};

export default Home;
