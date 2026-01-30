import Session from "../models/sessionModel.js";
import Activity from "../models/activityModel.js";
import Response from "../models/responseModel.js";

export const socketHandler = (io) => {

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);
    socket.on("join-session", async ({ code }) => {
      socket.join(code);

      const session = await Session.findOne({ code });
      socket.emit("slide-updated", session?.currentSlide || 0);
    });


  socket.on("change-slide", async ({ code, slideIndex }) => {
  await Session.updateOne(
    { code },
    { currentSlide: slideIndex }
  );
  const activity = await Activity.findOne({
    sessionCode: code,
    slideIndex: slideIndex - 1
  });

  console.log(activity, 'activity founded')

  if (activity) {
    await Session.updateOne(
      { code },
      { activeActivity: activity }
    );

    io.to(code).emit("activity-start", activity);
    return;
  }
  io.to(code).emit("slide-updated", slideIndex);
});

socket.on("submit-answer", async ({ code, answer }) => {

  const session = await Session.findOne({ code });
  const activity = session.activeActivity;

  let isCorrect = false;

  if (activity.type === "mcq") {
    isCorrect = Number(answer) === Number(activity.correctAnswer);
  }

  if (activity.type === "open") {
    isCorrect =
      answer?.trim().toLowerCase() ===
      activity.correctAnswer?.trim().toLowerCase();
  }

  await Response.create({
    sessionCode: code,
    activityId: activity._id,
    socketId: socket.id,
    answer,
    isCorrect,
    submittedAt: new Date()
  });

  const responses = await Response.find({
    sessionCode: code,
    activityId: activity._id
  });

  io.to(code).emit("response-update", responses);
});


socket.on("get-analytics", async ({ code }) => {

  const session = await Session.findOne({ code });
  const activity = session.activeActivity;

  if (!activity) return;

  const responses = await Response.find({
    sessionCode: code,
    activityId: activity._id
  });

  let analytics = {
    totalResponses: responses.length,
    optionCounts: {}
  };

  if (activity.type === "mcq") {
    activity.options.forEach((_, i) => {
      analytics.optionCounts[i] = 0;
    });

    responses.forEach(r => {
      analytics.optionCounts[r.answer]++;
    });
  }

  if (activity.type === "open") {
  analytics.correctCount = responses.filter(r => r.isCorrect).length;
}

  io.to(socket.id).emit("analytics-data", analytics);
});

socket.on("end-activity", async ({ code }) => {

  const session = await Session.findOne({ code });
  const activity = session.activeActivity;

  if (!session) return;

  const responses = await Response.find({
    sessionCode: code,
    activityId: activity?._id
  });
  io.to(code).emit("activity-results", {
    activity,
    responses
  });
  await Session.updateOne(
    { code },
    { activeActivity: null }
  );
  io.to(code).emit("slide-updated", session.currentSlide);
});

socket.on("show-results", async ({ code }) => {

  const session = await Session.findOne({ code });
  const activity = session.activeActivity;

  if (!activity) return;

  const responses = await Response.find({
    sessionCode: code,
    activityId: activity._id
  });

  io.to(code).emit("activity-results", {
    activity,
    responses
  });
});

  });
};


