import Test from "../models/test.js";
import Question from "../models/questions.js";

export const createTest = async (req, res) => {
  const { title, description } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });

  const test = await Test.create({ title, description });
  res.status(201).json(test);
};

// Get all Tests with questions
export const getTests = async (req, res) => {
  const tests = await Test.find().populate({
    path: "Questions",
    strictPopulate: false,
  });
  res.json(tests);
};
