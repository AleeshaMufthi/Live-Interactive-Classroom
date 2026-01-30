import Session from "../models/sessionModel.js";
import Activity from "../models/activityModel.js";

export const addActivity = async (req, res) => {
    console.log(req.body, 'request body')
  const { code, activity } = req.body;

  console.log(activity.question, 'activitide question')

  if (!activity?.question || !activity?.type) {
    return res.status(400).json({ error: "Invalid activity" });
  }

  const saved = await Activity.create({
    sessionCode: code,
    ...activity
  });

  console.log(saved, 'saved')

  res.json({ message: "Activity saved", activity: saved });
};

