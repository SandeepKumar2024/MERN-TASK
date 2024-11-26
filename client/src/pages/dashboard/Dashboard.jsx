import { useState, useEffect } from "react";
import CreateEmployee from "../../components/CreateEmployee/CreateEmployee";
import DashIntro from "../../components/dashIntroPage/DashIntro";
import EditEmployee from "../../components/editEmployee/EditEmployee";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import Navbar from "../../components/Navbar/Navbar";
import "./dashboard.scss";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("DashIntro"); // State to track active component
  const [adminInfo, setAdminInfo] = useState(null);
  console.log(adminInfo);

  useEffect(() => {
    // Fetch admin info from localStorage
    const storedAdminInfo =JSON.parse( localStorage.getItem("adminInfo"));

    setAdminInfo(storedAdminInfo.admin);
    
  }, []);

  const handleNavClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="dashboard">
      <div className="dash_top">
        {/* <Navbar /> */}
        <ul>
          <div className="ul_left">
            <li onClick={() => handleNavClick("DashIntro")}>Home</li>
            <li onClick={() => handleNavClick("EmployeeList")}>Employee List</li>
          </div>
          <div className="ul_right">
            <li>{adminInfo?.username || "Admin"}</li>
            <li
              onClick={() => {
                localStorage.removeItem("adminInfo");
                window.location.href = "/login";
              }}
            >
              Logout
            </li>
          </div>
        </ul>
      </div>
      <div className="dash_bott">
        {/* Render the active component */}
        {activeComponent === "DashIntro" && <DashIntro />}
        {activeComponent === "EmployeeList" && <EmployeeList />}
        {activeComponent === "CreateEmployee" && <CreateEmployee />}
        {activeComponent === "EditEmployee" && (
          <EditEmployee  />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
