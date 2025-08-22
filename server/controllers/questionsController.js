
import fs from "fs";
import csv from "csv-parser";
import Questions from "../models/questions.js";
import Test from "../models/test.js";


export const addQuestion = async (req, res) => {
  const { testId } = req.params;
  const { questionText, options, answer } = req.body;

  if (!questionText || !options || !answer)
    return res.status(400).json({ message: "All fields are required" });

  const test = await Test.findById(testId);
  if (!test) return res.status(404).json({ message: "Test not found" });

  const question = await Questions.create({
    test: testId,
    questionText,
    options,
    answer,
  });

  test.questions.push(question._id);
  await test.save();

  res.status(201).json(question);
};

export const getQuestionsByTest = async (req, res) => {
  const { testId } = req.params;

  const questions = await Questions.find({ test: testId });
  if (!questions.length)
    return res
      .status(404)
      .json({ message: "No questions found for this test" });

  res.json(questions);
};


export const bulkUploadQuestions = async (req, res) => {
  const { testId } = req.params;
  if (!req.file) return res.status(400).json({ message: "CSV file is required" });

  const results = [];
 const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const { question, A, B, C, D, answer } = row;
      if (question && A && B && C && D && answer) {
        results.push({
          test: testId,
          questionText: question,
          options: [A, B, C, D],
          answer,
        });
      }
    })
    .on("end", async () => {
      try {
        const createdQuestions = await Questions.insertMany(results);
        fs.unlinkSync(filePath); // remove CSV after processing
        res.status(200).json({
          message: `${createdQuestions.length} questions uploaded successfully!`,
          questions: createdQuestions,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to upload questions" });
      }
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).json({ message: "Error reading CSV file" });
    });
};