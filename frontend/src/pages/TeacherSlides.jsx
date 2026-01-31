import { useEffect, useState } from "react";
import socket from "../socket/socket";
import api from "../api/axios";
import toast from "react-hot-toast";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

export default function TeacherSlides({ code }) {
  const [slide, setSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [responses, setResponses] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [type, setType] = useState("mcq");
  const [correctTextAnswer, setCorrectTextAnswer] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activityLive, setActivityLive] = useState(false);



  useEffect(() => {
    socket.emit("join-session", { code, role: "teacher" });

    socket.on("slide-updated", setSlide);

    socket.on("response-update", (data) => {
      setResponses(data);
      socket.emit("get-analytics", { code });
    });

    socket.on("analytics-data", setAnalytics);
    //  console.log("📊 Analytics received:", data);
    //  setAnalytics(data);

    return () => socket.off();
  }, []);

const nextSlide = () => {
  const next = slide + 1;
  setSlide(next);
  socket.emit("change-slide", { code, slideIndex: next });
};


const addActivity = async () => {
  if (!question) {
    return toast.error("Please enter a question before saving.");
  }

  if (type === "mcq" && options.some(opt => !opt.trim())) {
    return toast.error("Please fill all MCQ options.");
  }

  if (type === "open" && !correctTextAnswer.trim()) {
    return toast.error("Please provide the correct answer.");
  }

  const toastId = toast.loading("Saving activity...");

  try {
    await api.post("/activity/add", {
      code,
      activity: {
        slideIndex: Number(slide),
        type,
        question,
        options: type === "mcq" ? options : [],
        correctAnswer: type === "mcq" ? correctAnswer : correctTextAnswer
      }
    });

     toast.success("Activity is now live!", { id: toastId });

         setActivityLive(true); 

    // RESET FORM
    setQuestion("");
    setOptions(["", "", ""]);
    setCorrectAnswer(0);
    setCorrectTextAnswer("");
    setType("mcq");

  } catch (err) {
    toast.error("❌ Failed to add activity. Try again.", { id: toastId });
  }
};


  const endActivity = () => {
  socket.emit("end-activity", { code });
  toast.success("Activity ended.");

  setActivityLive(false); // 🔓 Unlock Add Activity
  setAnalytics(null);
  setResponses([]);
};

 const uploadSlides = async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  setUploading(true);

  const toastId = toast.loading("Uploading PDF, This will take a moment...");

  try {
    await api.post(`/upload/${code}`, formData);

    toast.success("Upload complete! Converting to slides", {
      id: toastId,
    });

    pollSlides(); 

  } catch (err) {
    toast.error("Upload failed", { id: toastId });
    setUploading(false);
  }
};
const pollSlides = async () => {
  const interval = setInterval(async () => {
    try {
      const res = await api.get(`/session/${code}`);

      if (res.data.slides?.length > 0) {
        setSlides(res.data.slides);
        toast.success("Slides ready!");
        setUploading(false);
        clearInterval(interval);
      }
    } catch {}
  }, 1500);
};

return (
  <div className="h-screen bg-gray-100 flex flex-col">

    {/* Header Bar */}
    <div className="bg-white shadow px-6 py-4 flex justify-evenly items-center">

      <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition">
  <img src={logo} className="w-20 h-20 object-contain" />
  <span className="text-blue-700 text-xl">ZING</span>
</Link>
      <h1 className="text-lg font-semibold">
        🎤 Teacher Session — <span className="text-indigo-600">{code}</span>
      </h1>

      <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg border border-indigo-700 text-lg font-semibold">
        Share Code: <span className="font-bold tracking-widest">{code}</span>
      </div>
    </div>

    {/* Main Layout */}
    <div className="flex flex-1 gap-6 p-6">

      {/* LEFT: SLIDE PREVIEW (75%) */}
      <div className="flex-[3] flex flex-col items-center justify-center bg-white rounded-xl shadow p-4">

        {/* Upload Area */}
        {!slides.length && !uploading && (
          <label className="w-full h-64 border-2 border-dashed border-indigo-400 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition">
            <span className="text-indigo-600 font-semibold text-lg">
              📄 Upload PDF Slides
            </span>
            <span className="text-gray-500 text-sm mt-2">
              Click to upload your lesson PDF
            </span>
            <input type="file" onChange={uploadSlides} hidden />
          </label>
        )}

        {/* Uploading State */}
        {uploading && (
          <div className="w-84 h-[500px] bg-gray-200 animate-pulse rounded-xl flex items-center justify-center text-gray-600 text-lg">
            ⏳ Uploading & Converting Slides...
          </div>
        )}

        {/* Slides */}
        {!uploading && slides.length > 0 && slides[slide] && (
          <img
            src={`http://localhost:5000${slides[slide]}`}
            className="w-84 h-auto rounded-lg shadow-md"
          />
        )}

        {/* Next Slide */}
        <button
          onClick={nextSlide}
          disabled={uploading}
          className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50"
        >
          Next Slide →
        </button>
      </div>

      {/* RIGHT PANEL (25%) */}
      <div className="flex-[1] flex flex-col gap-6">

        {/* ADD ACTIVITY */}
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold mb-3 text-indigo-700">➕ Add Activity</h3>

          <input
            placeholder="Question"
            className="border p-2 w-full mb-2 rounded"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <select
            className="border p-2 w-full mb-3 rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="mcq">Multiple Choice</option>
            <option value="open">Open Ended</option>
          </select>

          {type === "mcq" && options.map((opt, i) => (
            <input
              key={i}
              placeholder={`Option ${i + 1}`}
              className="border p-2 w-full mb-2 rounded"
              value={opt}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />
          ))}

          {type === "open" && (
            <input
              placeholder="Correct Answer"
              className="border p-2 w-full mb-2 rounded"
              value={correctTextAnswer}
              onChange={(e) => setCorrectTextAnswer(e.target.value)}
            />
          )}

          {type === "mcq" && (
            <select
              className="border p-2 w-full mb-3 rounded"
              onChange={(e) => setCorrectAnswer(Number(e.target.value))}
            >
              <option value={0}>Correct Answer: Option 1</option>
              <option value={1}>Correct Answer: Option 2</option>
              <option value={2}>Correct Answer: Option 3</option>
            </select>
          )}

          <button
  onClick={addActivity}
  disabled={activityLive}
  className={`w-full py-2 rounded font-semibold transition 
    ${activityLive 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
      : "bg-indigo-600 hover:bg-indigo-700 text-white"}
  `}
>
  {activityLive ? "Activity Live 🔒" : "Save Activity"}
</button>
        </div>

        {/* END ACTIVITY */}
       <button
  onClick={endActivity}
  disabled={!activityLive}
  className={`py-3 rounded-lg font-semibold transition
    ${!activityLive 
      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
      : "bg-red-600 hover:bg-red-700 text-white"}
  `}
>
  End Activity
</button>

{activityLive && (
  <p className="mt-2 text-lg text-gray-800 italic">
    📢 Activity is live — Click <span className="font-semibold text-indigo-700">Next Slide</span> and wait until student update the answers.
   
  </p>
)}


        {/* ANALYTICS */}
        {analytics && (
          <>
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold mb-3 text-indigo-700">📊 Live Results</h3>
            <p className="mb-2 text-sm">Responses: {analytics.totalResponses}</p>

            {Object.entries(analytics.optionCounts).map(([opt, count]) => (
              <div key={opt} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span>Option {parseInt(opt) + 1}</span>
                  <span>{count}</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded mt-1">
                  <div
                    className="bg-indigo-500 h-2 rounded"
                    style={{
                      width: `${(count / (analytics.totalResponses || 1)) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
               <button
      onClick={() => {
        socket.emit("show-results", { code });
        toast.success(
          "📢 Showing results to students. You can end the activity after a while to continue."
        );
      }}
      className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold"
    >
          📊 Show Results to Students
        </button>
        </>
        )}
      

      </div>
    </div>
  </div>
);
}