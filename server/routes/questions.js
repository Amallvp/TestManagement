import express from "express";
import { addQuestion, bulkUploadQuestions, getQuestionsByTest } from "../controllers/questionsController.js";
import { adminProtect } from "../middlewares/authToken.js";
import { upload } from "../storage/uploadCsv.js";

const router = express.Router();

router.post("/:testId", adminProtect, addQuestion);
router.get("/:testId",adminProtect, getQuestionsByTest);
router.post("/:testId/upload", adminProtect, upload.single("file"), bulkUploadQuestions);

export default router;