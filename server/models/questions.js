import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Questions", questionSchema);
