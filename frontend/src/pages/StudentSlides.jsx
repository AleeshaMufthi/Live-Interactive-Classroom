import { useEffect, useState } from "react";
import socket from "../socket/socket";
import api from '../api/axios'

export default function StudentSlides({ code }) {

  const [slide, setSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [activity, setActivity] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [answer, setAnswer] = useState(null);


  useEffect(() => {

    socket.emit("join-session", { code, role: "student" });

    socket.on("slide-updated", setSlide);

    socket.on("activity-start", (activity) => {
      console.log(activity,'activity is added by teacher')
        setActivity(activity);
        setWaiting(false);
    });

    socket.on("activity-end", () => {
        setActivity(null);
        setWaiting(false);
    });

    api.get(`/session/${code}`).then(res => {
      setSlides(res.data.slides || []);
    });

    return () => {
    socket.off("slide-updated");
    socket.off("activity-start");
    socket.off("end-activity");
    };
}, []);

  const submitAnswer = () => {
  socket.emit("submit-answer", { code, answer });
  setWaiting(true);
  setActivity(null);
};

if (activity && !waiting) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-yellow-100 p-6">
      <h2 className="text-xl font-bold mb-4">{activity.question}</h2>

      {activity.type === "mcq" ? (
        activity.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setAnswer(i)}
            className="block px-4 py-2 border rounded mb-2"
          >
            {opt}
          </button>
        ))
      ) : (
        <textarea
          className="border p-3 w-full"
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      <button
        onClick={submitAnswer}
        className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg"
      >
        Submit
      </button>
    </div>
  );
}
if (waiting) {
  return (
    <div className="h-screen flex justify-center items-center text-xl">
      Waiting for teacher...
    </div>
  );
}



  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      {slides.length > 0 ? (
        <img
          src={`http://localhost:5000${slides[slide]}`}
          className="w-[700px] rounded shadow"
        />
      ) : (
        <h2>Waiting for teacher slides...</h2>
      )}

      
    </div>
  );
}

