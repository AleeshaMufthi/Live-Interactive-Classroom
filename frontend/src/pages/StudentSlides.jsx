import { useEffect, useState } from "react";
import socket from "../socket/socket";
import api from '../api/axios'

export default function StudentSlides({ code }) {

  const [slide, setSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [activity, setActivity] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [results, setResults] = useState(null);


  useEffect(() => {

    socket.emit("join-session", { code, role: "student" });

    // socket.on("slide-updated", setSlide);
    socket.on("slide-updated", (slideIndex) => {
  setSlide(slideIndex);
  setWaiting(false);
  setActivity(null);
  setResults(null);
});


    socket.on("activity-start", (activity) => {
      console.log(activity,'activity is added by teacher')
        setActivity(activity);
        setWaiting(false);
    });

    socket.on("activity-end", () => {
        setActivity(null);
        setWaiting(false);
    });

   socket.on("activity-results", ({ activity, responses }) => {
  setResults({ activity, responses });
  setWaiting(false);
  setActivity(null);
});


    socket.on("slide-updated", (slideIndex) => {
  setSlide(slideIndex);
  setActivity(null);
  setWaiting(false);
  setResults(null);
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
if (waiting && !activity) {
  return (
    <div className="h-screen flex justify-center items-center text-xl">
      Waiting for teacher to show results...
    </div>
  );
}

if (results) {
  const correct = results.activity.correctAnswer;

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-100 p-6">
      <h2 className="text-2xl font-bold mb-4">
        ✅ Results
      </h2>

      <h3 className="text-lg mb-4">
        Correct Answer: Option {correct + 1}
      </h3>

      {results.activity.options.map((opt, i) => (
        <div
          key={i}
          className={`px-4 py-2 border rounded mb-2 w-64 text-center ${
            i === correct ? "bg-green-500 text-white" : "bg-white"
          }`}
        >
          {opt}
        </div>
      ))}

      <p className="mt-4 text-gray-700">
        Waiting for teacher to continue...
      </p>
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

