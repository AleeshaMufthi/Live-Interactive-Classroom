import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  sessionCode: String,
  activityId: mongoose.Schema.Types.ObjectId,
  socketId: String,
  answer: mongoose.Schema.Types.Mixed,
  isCorrect: Boolean,
  submittedAt: Date
});
export default mongoose.model("Response", responseSchema);
