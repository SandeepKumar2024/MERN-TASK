const Admin = require('../model/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

exports.signup = async (req, res) => {
  try {
    const {username ,  email, password } = req.body;
    const admin = new Admin({ username ,email, password });
    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username , password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Wrong email or password !' });
    }
    const token = generateToken(admin._id);
    res.json({ token ,admin });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
