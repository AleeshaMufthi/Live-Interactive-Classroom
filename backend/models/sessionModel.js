import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  code: String,
  slides: [String],
  currentSlide: Number,
  activeActivity: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Session", sessionSchema);


// const sessionSchema = new mongoose.Schema({

//   code: String,

//   currentSlide: 
//   { 
//     type: Number, 
//     default: 0 
//   },

//   slides: [String],

//   activities: [
//   {
//     slideIndex: Number,
//     type: String, // "mcq" | "text"
//     question: String,
//     options: [String],
//     correctAnswer: Number
//   }
// ],

//   activeActivity: Object,

//   responses: [
//     {
//       socketId: String,
//       slideIndex: Number,
//       activityIndex: Number,
//       answer: mongoose.Schema.Types.Mixed,
//       time: { type: Date, default: Date.now }
//     }
//   ],

//   createdAt: { type: Date, default: Date.now },

// });

// export default mongoose.model("Session", sessionSchema);

