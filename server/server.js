import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import testRoutes from "./routes/test.js";
import questionRoutes from "./routes/questions.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
connectDB();
const PORT = process.env.PORT || 5000;

app.use("/health", (req, res) => {
  res.send("Server is healthy");
});

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/tests", testRoutes);
app.use("/api/v1/questions", questionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
