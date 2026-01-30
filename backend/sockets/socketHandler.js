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
  console.log("Slide:", slideIndex);
  const activity = await Activity.findOne({
    sessionCode: code,
    slideIndex: Number(slideIndex)-1
  });
  console.log("Found activity:", activity);
    if (activity) {
    io.to(code).emit("activity-start", activity);
  } else {
    io.to(code).emit("slide-updated", slideIndex);
  }
  await Session.updateOne(
    { code },
    { 
      currentSlide: slideIndex,
      activeActivity: activity || null
    }
  );
});


socket.on("submit-answer", async ({ code, answer }) => {
  await Response.create({
    sessionCode: code,
    socketId: socket.id,
    answer,
    submittedAt: new Date()
  });

  const responses = await Response.find({ sessionCode: code });
  io.to(code).emit("response-update", responses);
});


socket.on("get-analytics", async ({ code }) => {

  const session = await Session.findOne({ code });
  const activity = session.activeActivity;

  const responses = await Response.find({ sessionCode: code });

  let analytics = {
    totalResponses: responses.length,
    optionCounts: {}
  };

  if (activity?.type === "mcq") {
    activity.options.forEach((_, i) => {
      analytics.optionCounts[i] = 0;
    });

    responses.forEach(r => {
      analytics.optionCounts[r.answer]++;
    });
  }

  io.to(socket.id).emit("analytics-data", analytics);
});


    socket.on("end-activity", async ({ code }) => {
      const session = await Session.findOne({ code });

      io.to(code).emit("activity-results", {
        responses: session.responses,
        activity: session.activeActivity
      });

      await Session.updateOne({ code }, { responses: [], activeActivity: null });

       io.to(code).emit("activity-end");
    });
  });
};


