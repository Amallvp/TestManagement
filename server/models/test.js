import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions:[{type: mongoose.Schema.Types.ObjectId, ref: "Questions"}]
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
