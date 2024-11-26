import React, { useState } from "react";
import "./createEmployee.scss";

function CreateEmployee({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    image: null,
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const designations = ["Manager", "Developer", "Designer", "HR", "Tester"];
  const courses = ["BTech", "BSC", "BCA"];

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }
    if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Mobile number must be 10 digits starting with 6-9.";
    }
    if (!formData.designation) {
      errors.designation = "Designation is required.";
    }
    if (!formData.gender) {
      errors.gender = "Please select a gender.";
    }
    if (formData.courses.length === 0) {
      errors.courses = "At least one course must be selected.";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedCourses = checked
        ? [...prevData.courses, value]
        : prevData.courses.filter((course) => course !== value);
      return { ...prevData, courses: updatedCourses };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validateForm()) return;

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("designation", formData.designation);
    data.append("gender", formData.gender);
    formData.courses.forEach((course) => data.append("courses[]", course));
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await onSave(data);
      setSuccess("Employee created successfully!");
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        courses: [],
        image: null,
      });
    } catch (err) {
      setError({ form: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="create-employee-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name..."
            value={formData.name}
            onChange={handleChange}
          />
          {error.name && <p className="error">{error.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            value={formData.email}
            onChange={handleChange}
          />
          {error.email && <p className="error">{error.email}</p>}
        </div>

        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobile"
            placeholder="Enter mobile number..."
            value={formData.mobile}
            onChange={handleChange}
          />
          {error.mobile && <p className="error">{error.mobile}</p>}
        </div>

        <div>
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="">Select Designation</option>
            {designations.map((designation, index) => (
              <option key={index} value={designation}>
                {designation}
              </option>
            ))}
          </select>
          {error.designation && <p className="error">{error.designation}</p>}
        </div>

        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />
          Female
          {error.gender && <p className="error">{error.gender}</p>}
        </div>

        <div>
          <label>Courses (Select Multiple):</label>
          {courses.map((course, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={course}
                checked={formData.courses.includes(course)}
                onChange={handleCourseChange}
              />
              {course}
            </div>
          ))}
          {error.courses && <p className="error">{error.courses}</p>}
        </div>

        <div>
          <label>Profile Picture:</label>
          <input type="file" name="image" onChange={handleImageChange} />
        </div>

        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>

        {error.form && <p className="error">{error.form}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default CreateEmployee;
