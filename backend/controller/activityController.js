import Session from "../models/sessionModel.js";
import Activity from "../models/activityModel.js";

export const addActivity = async (req, res) => {
    console.log(req.body, 'request body')
  const { code, activity } = req.body;


  if (!activity?.question || !activity?.type) {
    return res.status(400).json({ error: "Invalid activity" });
  }

  const saved = await Activity.create({
    sessionCode: code,
    ...activity
  });

  res.json({ message: "Activity saved", activity: saved });
};