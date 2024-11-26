const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    courses: { type: [String], required: true }, // Array of strings for multiple checkboxes
    image: { type: String, default: null }, // Path to the uploaded image
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

module.exports = mongoose.model("Employee", employeeSchema);
