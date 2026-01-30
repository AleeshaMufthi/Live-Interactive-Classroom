import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  sessionCode: String,
  slideIndex: Number,
  type: { type: String, enum: ["mcq", "open"] },
  question: String,
  options: [String],
  correctAnswer: mongoose.Schema.Types.Mixed,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model("Activity", activitySchema);
