import dotenv from "dotenv";
import User from "../models/auth.js";
import {connectDB }from "../config/db.js";

dotenv.config();
connectDB();

const seedAdmin = async () => {
  try {
    const exists = await User.findOne({ email: "admin@test.com" });
    if (!exists) {
      await User.create({ email: "admin@test.com", password: "123456" });
      console.log("Admin created: admin@test.com / 123456");
    } else {
      console.log("Admin already exists");
    }
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
