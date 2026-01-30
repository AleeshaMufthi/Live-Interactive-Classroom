import { useState } from "react";
import api from "../api/axios";
import TeacherSlides from "./TeacherSlides";

export default function TeacherSession() {
  const [code, setCode] = useState(null);

  const createSession = async () => {
    const res = await api.post("/session/create");
    setCode(res.data.code);
  };

  if (code) return <TeacherSlides code={code} />;

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-4">Start Teacher Session</h2>
      <button
        onClick={createSession}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
      >
        Create Session
      </button>
    </div>
  );
}
