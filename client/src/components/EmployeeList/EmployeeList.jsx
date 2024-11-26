import React, { useState, useEffect } from "react";
import axios from "axios";
import "./employeeList.scss";
import CreateEmployee from "../CreateEmployee/CreateEmployee";
import EditEmployee from "../editEmployee/EditEmployee";
import { formatDistanceToNow } from "date-fns";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreating, setIsCreating] = useState(false); // Toggle between views
  const [isEditing, setIsEditing] = useState(false); // Toggle for editing mode
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("adminInfo")
        ? JSON.parse(localStorage.getItem("adminInfo")).token
        : null;
      const response = await axios.get(
        "http://localhost:5000/api/v2/employees/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const handleCreateEmployee = async (newEmployee) => {
    try {
      const token = localStorage.getItem("adminInfo")
        ? JSON.parse(localStorage.getItem("adminInfo")).token
        : null;
      const response = await axios.post(
        "http://localhost:5000/api/v2/employees",
        newEmployee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees([...employees, response.data]);
      setIsCreating(false);
    } catch (err) {
      console.error("Error creating employee:", err);
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      const token = localStorage.getItem("adminInfo")
        ? JSON.parse(localStorage.getItem("adminInfo")).token
        : null;
      await axios.put(
        `http://localhost:5000/api/v2/employees/${updatedEmployee._id}`,
        updatedEmployee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchEmployees();
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminInfo")
        ? JSON.parse(localStorage.getItem("adminInfo")).token
        : null;
      await axios.delete(`http://localhost:5000/api/v2/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
    setIsEditing(true);
  };

  // Filter employees based on search query for multiple fields
  const filteredEmployees = employees.filter((employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.name.toLowerCase().includes(query) ||
      employee.email.toLowerCase().includes(query) ||
      employee.mobile.includes(query) ||
      employee.designation.toLowerCase().includes(query)
    );
  });

  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  if (isCreating) {
    return (
      <CreateEmployee
        onSave={handleCreateEmployee}
        onCancel={() => setIsCreating(false)}
      />
    );
  }
  if (isEditing && employeeToEdit) {
    return (
      <EditEmployee
        employeeData={employeeToEdit}
        onSubmit={handleUpdateEmployee}
      />
    );
  }

  return (
    <div className="employee_table">
      <div className="table_header">
        <div className="t_left">Employee List</div>
        <div className="t_right">
          <div className="total_count">
            Total Employees: {filteredEmployees.length}
          </div>
          <div className="search_bar">
            <span>Search: </span>
            <input
              type="text"
              placeholder="Search by name, email, mobile, or designation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="create_employee"
            onClick={() => setIsCreating(true)}
          >
            Create Employee
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>
                <img
                  src={`http://localhost:5000/${employee.image}`}
                  alt="employee"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.courses}</td>
              <td>{formatDistanceToNow(new Date(employee.createdAt))} ago</td>
              <td className="action">
                <button className="edit" onClick={() => handleEdit(employee)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredEmployees.length > itemsPerPage && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
