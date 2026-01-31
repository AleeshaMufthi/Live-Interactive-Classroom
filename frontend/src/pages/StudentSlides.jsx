import { useEffect, useState } from "react";
import socket from "../socket/socket";
import api from '../api/axios'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

export default function StudentSlides({ code }) {

  const [slide, setSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [activity, setActivity] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [results, setResults] = useState(null);


  useEffect(() => {

    socket.emit("join-session", { code, role: "student" });

    socket.on("slide-updated", (slideIndex) => {
  setSlide(slideIndex);
  setWaiting(false);
  setActivity(null);
  setResults(null);
});


    socket.on("activity-start", (activity) => {
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
    socket.off("activity-results");
    };
}, []);

  const submitAnswer = () => {
  socket.emit("submit-answer", { code, answer });
  setWaiting(true);
  setActivity(null);
};

 if (activity && !waiting) {
    return (
    <>
      
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-yellow-200 p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-yellow-700 text-center">
            📌 {activity.question}
          </h2>

          {activity.type === "mcq" ? (
            activity.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAnswer(i)}
                className="block w-full text-left px-6 py-3 mb-3 rounded-lg border border-yellow-300 hover:bg-yellow-100 transition font-medium"
              >
                {opt}
              </motion.button>
            ))
          ) : (
            <textarea
              className="w-full p-4 border rounded-lg mb-4 focus:outline-yellow-400 focus:ring-2 focus:ring-yellow-200 transition"
              placeholder="Type your answer here..."
              onChange={(e) => setAnswer(e.target.value)}
            />
          )}

          <motion.button
            onClick={submitAnswer}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl font-semibold shadow-lg transition"
          >
            Submit Answer
          </motion.button>
        </motion.div>
      </div>
      </>
    );
  }

  // ----------------------------
  // WAITING STATE UI
  // ----------------------------
  if (waiting && !activity) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full mb-6"
        />
        <h2 className="text-xl font-medium text-gray-700">
          ⏳ Waiting for teacher to show results...
        </h2>
      </div>
    );
  }

  // ----------------------------
  // RESULTS UI
  // ----------------------------
  if (results) {
    const activity = results.activity;

    return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-50 to-green-200 p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-green-700">
            ✅ Results
          </h2>

          {activity.type === "open" ? (
            <>
              <h3 className="text-lg font-semibold mb-2">Correct Answer:</h3>
              <p className="bg-green-100 px-6 py-3 rounded-lg border border-green-200">
                {activity.correctAnswer}
              </p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-4">
                Correct Answer: Option {activity.correctAnswer + 1}
              </h3>

              {activity.options.map((opt, i) => (
                <div
                  key={i}
                  className={`px-6 py-3 mb-3 rounded-lg border text-lg font-medium transition 
                    ${
                      i === activity.correctAnswer
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-white text-gray-800 border-gray-200 hover:bg-green-50"
                    }`}
                >
                  {opt}
                </div>
              ))}
            </>
          )}

          <p className="mt-6 text-gray-600 italic">
            Waiting for teacher to continue...
          </p>
        </motion.div>
      </div>
    );
  }

  // ----------------------------
  // SLIDES UI
  // ----------------------------
  return (
    <>
    <div className="fixed top-0 left-0 w-full z-50">
    <div className="bg-white shadow px-6 py-4 flex justify-evenly items-center">

      <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition">
  <img src={logo} className="w-20 h-20 object-contain" />
  <span className="text-blue-700 text-xl">ZING</span>
</Link>
      <h1 className="text-lg font-semibold">
        Student Session — <span className="text-indigo-600">{code}</span>
      </h1>

      <div className="text-indigo-700 px-4 py-2 rounded-lg text-lg font-semibold">
        <span className="font-bold tracking-widest">Hocus Pocus… Everybody Focus!</span>
      </div>
    </div>
</div>
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
        
      {slides.length > 0 ? (
        <motion.img
          key={slide}
          src={`http://localhost:5000${slides[slide]}`}
          className="rounded-2xl shadow-2xl w-full max-w-3xl border border-gray-200"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <h2 className="text-xl text-gray-500">Waiting for teacher slides...</h2>
      )}
    </div>
    </>
  );
}
