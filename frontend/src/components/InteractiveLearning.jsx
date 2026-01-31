import React, {useState} from 'react'
import { motion } from "framer-motion";

import basics from '../assets/hw1.jpg'
import week2 from '../assets/hw3.jpg'
import week3 from '../assets/hw2.png'
import week4 from '../assets/hw4.jpg'

const programWeeks = [
  {
    id: 1,
    title: "Real-Time Slide Sync",
    subtitle: "Students automatically follow the teacher's slides in real time. As you move the slides, your students move with you—automatically.",
    image: basics,
  },
  {
    id: 2,
    title: "Live Activities & Quizzes",
    subtitle: "MCQs, open-ended questions, polls, and instant response tracking. Keep students on their toes!",
    image: week2,
  },
  {
    id: 3,
    title: " Live Results & Analytics",
    subtitle: "Teachers see live answers, stats, and engagement metrics.",
    image: week3,
  },
    {
    id: 4,
    title: "Upload & Transform",
    subtitle: "Drop your PDF or PPT files and watch Zing turn them into beautiful, high-quality slide images instantly.",
    image: week4,
  },
];


const InteractiveLearning = () => {
   const [activeWeek, setActiveWeek] = useState(1);

  const currentWeek = programWeeks.find(w => w.id === activeWeek);

  return (
    <section id="features" className="bg-white py-28 px-8 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-6">
          How It Works
        </h2>
        <p className="text-center text-gray-600 text-xl mb-16">
           Built on real-time communication for a seamless classroom experience.
        </p>

        {/* Progress Bar */}
     {/* Timeline */}
<div className="relative mb-16">

  {/* Base Line */}
  <div className="absolute top-6 left-0 w-full h-[3px] bg-gray-300 rounded-full" />

  {/* Animated Progress Line */}
  <motion.div
    className="absolute top-6 left-0 h-[3px] bg-indigo-500 rounded-full"
    initial={{ width: "0%" }}
    animate={{
      width: `${((activeWeek - 1) / (programWeeks.length - 1)) * 100}%`,
    }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  />

  {/* Week Nodes */}
  <div className="flex justify-between relative z-10">
    {programWeeks.map((week) => (
      <div key={week.id} className="flex flex-col items-center">
        <motion.button
          onClick={() => setActiveWeek(week.id)}
          initial={false}
          animate={{
            scale: activeWeek === week.id ? 1.2 : 1,
            backgroundColor:
              activeWeek >= week.id ? "#6366f1" : "#ffffff",
            borderColor:
              activeWeek >= week.id ? "#6366f1" : "#d1d5db",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-gray-800"
        >
          {week.id}
        </motion.button>
      </div>
    ))}
  </div>
</div>


        {/* Active Week Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              {currentWeek.title}
            </h3>
            <p className="text-gray-600 max-w-lg mb-6 text-xl">
              {currentWeek.subtitle}
            </p>
          </div>

          <motion.div
  key={activeWeek}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
          <div className="flex justify-center rounded-xl">
            <img
              src={currentWeek.image}
              alt={currentWeek.title}
              className="w-full h-56 max-w-sm rounded-2xl"
            />
          </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default InteractiveLearning