import express from "express";
import { loginUser,logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

export default router;