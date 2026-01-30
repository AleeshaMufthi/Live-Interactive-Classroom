import { useState } from "react";
import StudentSlides from "./StudentSlides";

export default function StudentJoin() {
  const [code, setCode] = useState("");
  const [joined, setJoined] = useState(false);

  const joinSession = () => {
    setJoined(true);
  };

  if (joined) return <StudentSlides code={code} />;

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-4">Join Session</h2>

      <input
        className="border px-4 py-2 rounded mb-4"
        placeholder="Enter Session Code"
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        onClick={joinSession}
        className="px-6 py-3 bg-green-600 text-white rounded-lg"
      >
        Join
      </button>
    </div>
  );
}
