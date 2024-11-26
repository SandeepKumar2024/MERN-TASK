import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Signup from "./components/signup/Signup.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Home from "./pages/home/Home.jsx";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("adminInfo");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Redirect to dashboard if authenticated */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
