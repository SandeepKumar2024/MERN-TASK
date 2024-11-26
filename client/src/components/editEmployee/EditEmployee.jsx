import React, { useState, useEffect } from "react";
import "./editEmployee.scss";

const availableDesignations = [
  "Manager",
  "Developer",
  "Designer",
  "HR",
  "Tester",
];
const availableCourses = ["BTech", "BSC", "BCA"];

const EditEmployee = ({ employeeData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [], // array for selected courses
    image: null,
  });
  // console.log("employee data:",employeeData)

  // When the component mounts, set formData to the passed employee data
  useEffect(() => {
    if (employeeData) {
      setFormData({
        _id: employeeData._id,
        name: employeeData.name || "",
        email: employeeData.email || "",
        mobile: employeeData.mobile || "",
        designation: employeeData.designation || "",
        gender: employeeData.gender || "",
        courses: employeeData.courses || [], // pre-selected courses
        image: employeeData.image || null,
      });
    }
  }, [employeeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    // console.log("file all filed :" , formData);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCourses = checked
        ? [...prevData.courses, value]
        : prevData.courses.filter((course) => course !== value);
      return {
        ...prevData,
        courses: updatedCourses,
      };
    });
  };

  const handleSubmit = async (e) => {  //Error while updating image 
    e.preventDefault();

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <span>Edit Employee </span>
      <div>
        <label>Name:</label>
        <input
          className="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          className="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Mobile No:</label>
        <input
          className="mobile"
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label>Designation:</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Designation</option>
          {availableDesignations.map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label>Courses</label>
        <div>
          {availableCourses.map((course) => (
            <div key={course}>
              <input
                type="checkbox"
                id={course}
                value={course}
                checked={formData.courses.includes(course)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={course}>{course}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label>Profile Picture</label>
        <input type="file" name="image" onChange={handleFileChange} />
        {formData.image && (
          <img
            src={`http://localhost:5000/${formData.image}`}
            alt="Profile Preview"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
        )}
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default EditEmployee;
