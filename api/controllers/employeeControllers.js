const Employee = require('../model/employee');

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, courses } = req.body;
    // console.log("image",req.file)
    const image = req.file ? req.file.filename : null;

    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      courses, 
      image,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    console.log("file name  :",req.file);
    if (req.file) updates.image = req.file.path;
    const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
