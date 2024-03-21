const Admin = require("../models/adminModels");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ADMIN_JWT_SECRET, {
    expiresIn: "1d",
  });
};

const adminRegister = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const admin = await Admin.registerAdmin(email, name, password);
    const token = createToken(admin._id);
    res.status(201).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.loginAdmin(email, password);
    const token = createToken(admin._id);
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { adminRegister, adminLogin };