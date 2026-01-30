import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  sessionCode: String,
  slideIndex: Number,
  type: String,
  question: String,
  options: [String],
  correctAnswer: Number,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Activity", activitySchema);
