import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import videobanner from '../assets/videobanner.mov'
import InteractiveLearning from "../components/InteractiveLearning";
import MarqueeSection from "../components/MarqueeSection";
import Students from "../components/Students";
import Teachers from "../components/Teachers";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="bg-white border-b shadow-sm fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-xl">
            <img src={logo} className="w-16 h-16 object-contain" />
            <span className="text-blue-700 text-xl">ZING</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-8 text-md font-medium">
            <a href="#features" className="hover:text-blue-700">Our Features</a>
            <a href="#teachers" className="hover:text-blue-700">For Teachers</a>
            <a href="#students" className="hover:text-blue-700">For Students</a>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Link to="/student">
              <button className="px-4 py-2 border border-blue-700 text-lg font-semibold text-blue-700 rounded-full hover:bg-blue-100">
                Start Learning
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO VIDEO BANNER */}
      <section className="pt-24">
        <div className="relative w-full h-[85vh] overflow-hidden">

          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
            src={videobanner} // replace with your video path
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Hero Text */}
          <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-6 text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Built for Modern  
              <span className="text-indigo-400"> Interactive Learning</span>
            </h1>

            <p className="text-2xl text-gray-200 max-w-2xl mb-8">
              Real-time interactive presentations, live activities, quizzes, and instant student feedback - <strong className="text-indigo-400">All in one platform.</strong>
            </p>

            <div className="flex gap-6 text-lg">
            
                  <Link to="/teacher" className="border border-gray-600 px-4 py-2 rounded-full flex justify-between items-center">
                    <span className="mr-2">Inspire Students</span>

                    <span className="px-4 py-2 bg-gray-600 rounded-full text-white hover:bg-gray-800 transition">
                         Host a Session
                    </span>
                  </Link> 

              <Link to="/student" className="border border-indigo-600 px-4 py-2 rounded-full flex justify-between items-center">
               <span className="mr-2">Show your spark</span>
               <span className="px-4 py-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-800 transition">
                        Join the Fun
                    </span>
                
              </Link>
            </div>

          </div>

        </div>
      </section>

      <InteractiveLearning />

      <MarqueeSection />

      <Students />

      <Teachers />

      <footer className="py-10 text-center text-gray-600 border-t border-gray-200">
        <p>© {new Date().getFullYear()} ZING PLATFORM. All Rights Reserved.</p>
      </footer>

  
    </div>
  );
}

/* Feature Card Component */
function Feature({ title, text }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-left">
      <h4 className="font-semibold text-lg mb-3">{title}</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
