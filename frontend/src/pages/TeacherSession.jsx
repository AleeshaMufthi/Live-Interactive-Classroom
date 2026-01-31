import { useState } from "react";
import api from "../api/axios";
import TeacherSlides from "./TeacherSlides";
import teacher from '../assets/teacher.jpg'
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'

export default function TeacherSession() {
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);

  const createSession = async () => {
    try {
      setLoading(true);
      const res = await api.post("/session/create");
      setCode(res.data.code);
    } finally {
      setLoading(false);
    }
  };

  if (code) return <TeacherSlides code={code} />;

  return (
    <div className="min-h-screen bg-gray-50">

                  <nav className="bg-transparent fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl">


<Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition">
  <img src={logo} className="w-20 h-20 object-contain" />
  <span className="text-blue-700 text-xl">ZING</span>
</Link>

          </div>
        </div>
      </nav>

      {/* Background Image Strip */}
      <div className="w-full h-72 relative overflow-hidden">
        <img
          src={teacher} 
          alt="Teaching Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Floating Card */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="-mt-28 bg-[#F8FAFF] rounded-[36px] shadow-xl p-10 md:p-14 text-center relative z-10 border border-indigo-100">

          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Start Your Live Teaching Session
          </h2>

          <p className="text-gray-600 mb-8 text-lg">
            Launch your classroom instantly and engage your students in real-time.
          </p>

          {/* CTA Button */}
          <button
            onClick={createSession}
            disabled={loading}
            className="px-5 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-semibold text-xl transition shadow-md"
          >
            {loading ? "Creating Session..." : "Create Live Session"}
          </button>

          {/* Feature Pills */}
          <div className="mt-8 flex flex-wrap gap-5 text-gray-700 text-base">

            <div className="px-4 py-3 rounded-xl shadow-sm bg-gray-200 border border-gray-400">
              🎥 Live Teaching Tools
            </div>

            <div className="bg-purple-200 border border-purple-400 px-4 py-3 rounded-xl shadow-sm">
              📊 Real-time Student Tracking
            </div>

            <div className="bg-gray-200 border border-gray-400 px-4 py-3 rounded-xl shadow-sm">
              🔒 Secure Teacher Controls
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
// import { useState } from "react";
// import api from "../api/axios";
// import TeacherSlides from "./TeacherSlides";

// export default function TeacherSession() {
//   const [code, setCode] = useState(null);

//   const createSession = async () => {
//     const res = await api.post("/session/create");
//     setCode(res.data.code);
//   };

//   if (code) return <TeacherSlides code={code} />;

//   return (
//     <div className="h-screen flex flex-col justify-center items-center">
//       <h2 className="text-3xl mb-4">Start Teacher Session</h2>
//       <button
//         onClick={createSession}
//         className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
//       >
//         Create Session
//       </button>
//     </div>
//   );
// }
