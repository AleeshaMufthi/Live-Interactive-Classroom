import { useState } from "react";
import StudentSlides from "./StudentSlides";
import student from '../assets/studentjoin.jpg'
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

export default function StudentJoin() {
  const [code, setCode] = useState("");
  const [joined, setJoined] = useState(false);

  const joinSession = () => {
    if (!code) return alert("Please enter a session code");
    setJoined(true);
  };

  if (joined) return <StudentSlides code={code} />;

  return (
    <>
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

      <div className="w-full h-72 relative overflow-hidden">
        <img
          src={student} 
          alt="Students Learning"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="-mt-28 bg-blue-100 rounded-[36px] shadow-xl p-10 md:p-14 relative z-10">

          <h2 className="text-4xl text-center md:text-5xl font-bold text-gray-900 mb-3">
            Join your live class now
          </h2>
          <p className="text-gray-800 mb-8 text-xl text-center">
            Enter your session code to start learning and have fun.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              className="flex-1 px-5 py-4 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Session Code"
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              onClick={joinSession}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition shadow-md"
            >
              Join Now
            </button>
          </div>

          {/* Trust / Feature Pills */}
          <div className="flex flex-wrap gap-5 text-gray-700 text-base">

            <div className="bg-amber-100 text-md font-semibold px-5 py-3 rounded-xl shadow-sm border border-amber-300">
              🎯 Live Interactive Classes
            </div>

            <div className="bg-lime-100 text-md font-semibold px-5 py-3 rounded-xl shadow-sm border border-lime-300">
              🧠 Fun Learning Experience
            </div>

            <div className="bg-purple-100 text-md font-semibold px-5 py-3 rounded-xl shadow-sm border border-purple-300">
              🛡️ Safe Student Space
            </div>

          </div>
        </div>
      </div>

    </div>
      </>
  );
}

// import { useState } from "react";
// import StudentSlides from "./StudentSlides";

// export default function StudentJoin() {
//   const [code, setCode] = useState("");
//   const [joined, setJoined] = useState(false);

//   const joinSession = () => {
//     setJoined(true);
//   };

//   if (joined) return <StudentSlides code={code} />;

//   return (
//     <div className="h-screen flex flex-col justify-center items-center">
//       <h2 className="text-3xl mb-4">Join Session</h2>

//       <input
//         className="border px-4 py-2 rounded mb-4"
//         placeholder="Enter Session Code"
//         onChange={(e) => setCode(e.target.value)}
//       />

//       <button
//         onClick={joinSession}
//         className="px-6 py-3 bg-green-600 text-white rounded-lg"
//       >
//         Join
//       </button>
//     </div>
//   );
// }
