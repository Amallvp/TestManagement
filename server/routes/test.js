import express from "express";
import { createTest, getTests } from "../controllers/testController.js";
import { adminProtect } from "../middlewares/authToken.js";

const router = express.Router();

router.post("/", adminProtect, createTest);
router.get("/",adminProtect, getTests);

export default router;
