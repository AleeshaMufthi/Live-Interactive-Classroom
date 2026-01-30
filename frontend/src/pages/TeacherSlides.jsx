import { useEffect, useState } from "react";
import socket from "../socket/socket";
import api from "../api/axios";

export default function TeacherSlides({ code }) {
  const [slide, setSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [responses, setResponses] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    socket.emit("join-session", { code, role: "teacher" });

    socket.on("slide-updated", setSlide);

    socket.on("response-update", (data) => {
      setResponses(data);
      socket.emit("get-analytics", { code });
    });

    socket.on("analytics-data", setAnalytics);

    return () => socket.off();
  }, []);

const nextSlide = () => {
  const next = slide + 1;
  setSlide(next);
  socket.emit("change-slide", { code, slideIndex: next });
};


   console.log(slide,'slideeeee', Number(slide), 'slide number')

const addActivity = async () => {
  if (!question || options.some(o => !o)) {
    return alert("Fill all fields");
  }

  await api.post("/activity/add", {
    code,
    activity: {
      slideIndex: Number(slide),
      type: "mcq",
      question,
      options,
      correctAnswer
    }
  });

  alert("Activity added!");
  setQuestion("");
  setOptions(["", "", ""]);
  setCorrectAnswer(0);
};

  const endActivity = () => {
    socket.emit("end-activity", { code });
    alert('The activity is ended')
  };

 const uploadSlides = async (e) => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  await api.post(`/upload/${code}`, formData);

  const res = await api.get(`/session/${code}`);
  setSlides(res.data.slides || []);

  alert("Slides uploaded successfully!");
};
  return (
    <div className="h-screen flex flex-col items-center p-6">
      <h1 className="text-xl mb-4">Teacher View — Session {code}</h1>

      <div>
        <h1>Add pdf/ppt</h1>
        <input type="file" onChange={uploadSlides} className="mb-4" />
      </div>

     {slides.length > 0 && slides[slide] && (
  <img
    src={`http://localhost:5000${slides[slide]}`}
    className="w-[700px] rounded shadow mb-6"
  />
)}
      <button
        onClick={nextSlide}
        className="px-6 py-3 bg-indigo-600 text-white rounded"
      >
        Next Slide →
      </button>



      <div className="bg-white p-4 rounded shadow w-[400px] mt-6">
  <h3 className="font-bold mb-2">➕ Add Activity</h3>

  <input
    placeholder="Question"
    className="border p-2 w-full mb-2"
    onChange={(e) => setQuestion(e.target.value)}
  />
  {options.map((opt, i) => (
    <input
      key={i}
      placeholder={`Option ${i + 1}`}
      className="border p-2 w-full mb-2"
      onChange={(e) => {
        const copy = [...options];
        copy[i] = e.target.value;
        setOptions(copy);
      }}
    />
  ))}

    <select
  className="border p-2 w-full mb-3"
  onChange={(e) => setCorrectAnswer(Number(e.target.value))}
>
  <option value={0}>Correct Answer: Option 1</option>
  <option value={1}>Correct Answer: Option 2</option>
  <option value={2}>Correct Answer: Option 3</option>
</select>

  <button onClick={addActivity} className="bg-indigo-600 text-white px-4 py-2 rounded">
    Save Activity
  </button>
</div>


            <button
        onClick={endActivity}
        className="px-6 py-3 bg-red-600 text-white rounded mb-6"
      >
        End Activity
      </button>

       {analytics && (
        <div className="bg-white p-5 rounded-lg shadow w-[400px]">
          <h3 className="font-semibold mb-2">📊 Live Results</h3>
          <p>Total Responses: {analytics.totalResponses}</p>

          {Object.entries(analytics.optionCounts).map(([opt, count]) => (
            <div key={opt} className="mt-2">
              <div className="flex justify-between text-sm">
                <span>Option {parseInt(opt) + 1}</span>
                <span>{count}</span>
              </div>

              <div className="w-full bg-gray-200 h-3 rounded mt-1">
                <div
                  className="bg-indigo-500 h-3 rounded"
                  style={{
                    width: `${(count / (analytics.totalResponses || 1)) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
<button
  onClick={() => socket.emit("show-results", { code })}
  className="px-6 py-3 bg-green-700 text-white rounded mb-4"
>
  📊 Show Results to Students
</button>

    </div>
  );
}