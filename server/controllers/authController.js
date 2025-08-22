import User from "../models/auth.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // 1 day expiry
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = generateToken(admin._id);

  res.json({
    admin: { email: admin.email },
    token,
  });
};

export const logoutUser = (req, res) => {
  res.json({ message: "Logged out successfully" });
};
