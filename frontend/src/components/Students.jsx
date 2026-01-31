import React from 'react'
import logo from '../assets/logo.png'
import students from '../assets/students.jpg'

const STAR = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
    className="mb-4 text-emerald-600"
  >
    <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
  </svg>
);

const Students = () => {
  return (
    <section id="students">
        <div className="relative mt-5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white rounded-[40px] p-6 md:p-12 lg:p-30 overflow-hidden">
  
  {/* LEFT – FLOATING PILLS (DESKTOP ONLY) */}
  <div className="hidden lg:block">
    <div className="relative min-h-[580px]">

      {/* 1 */}
      <div className="absolute top-4 left-8 flex items-center gap-3">
        <span className="rounded-full bg-blue-300 text-black px-4 py-2 font-medium text-md">
          Interactive Classroom
        </span>
        {STAR}
      </div>

      {/* 2 */}
      <div className="absolute top-24 left-28 flex items-center gap-3">
        <span className="rounded-full bg-indigo-700 text-white px-4 py-2 font-medium text-md">
          Real-Time Slide Sync
        </span>
        {STAR}
      </div>

      {/* 3 */}
      <div className="absolute top-14 right-12 flex items-center gap-3">
        <span className="rounded-full bg-blue-300 text-black px-4 py-2 font-medium text-md">
          Child-Friendly EdTech
        </span>
        {STAR}
      </div>

      {/* 4 */}
      <div className="absolute top-44 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="rounded-full bg-indigo-700 text-white px-4 py-2 font-medium text-md">
          Live Presentation Activities
        </span>
        {STAR}
      </div>

      {/* 5 */}
      <div className="absolute top-64 left-20 flex items-center gap-3">
        <span className="rounded-full bg-blue-300 text-black px-4 py-2 font-medium text-md">
          Synchronized Learning
        </span>
        {STAR}
      </div>

      {/* 6 */}
      <div className="absolute top-80 right-20 flex items-center gap-3">
        <span className="rounded-full bg-indigo-700 text-white px-4 py-2 font-medium text-md">
          Enhance Student engagement
        </span>
        {STAR}
      </div>

      {/* TailorPro Floating Pill */}
      <div className="absolute top-[200px] right-[-78px] z-10">
        <span className="flex items-center gap-2 rounded-full bg-white text-blue-700 px-6 py-2 font-medium text-xl border-2 border-gray-700 shadow-lg">
          ZING
          <img
            src={logo}
            alt="TailorPro Logo"
            className="h-10 w-10 object-contain"
          />
        </span>
      </div>

      {/* 7 */}
      <div className="absolute bottom-28 left-12 flex items-center gap-3">
        <span className="rounded-full bg-indigo-700 text-white px-4 py-2 font-medium text-md">
          Seamless Presentation Flow
        </span>
        {STAR}
      </div>

      {/* 8 */}
      <div className="absolute bottom-16 right-10 flex items-center gap-3">
        <span className="rounded-full bg-blue-300 text-black px-4 py-2 font-medium text-md">
          Access Anywhere, Anytime
        </span>
        {STAR}
      </div>

      {/* 9 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="rounded-full bg-indigo-700 text-white px-4 py-2 font-medium text-md">
          Instant Class Feedback
        </span>
        {STAR}
      </div>

    </div>
  </div>

  {/* RIGHT – CONTENT (ALWAYS VISIBLE) */}
  <div>
    <p className="text-2xl md:text-4xl leading-normal tracking-normal font-semibold text-gray-950 mb-8">
      Just enter the code and
      <span> join the fun</span>
    </p>

    <div className="bg-gray-200 rounded-3xl min-h-[260px] md:min-h-[500px] lg:h-80 flex items-center justify-center overflow-hidden">

      <img
        src={students}
        alt="Modern tailoring solutions"
        className="h-full w-full object-cover rounded-3xl"
      />
    </div>
  </div>
</div>

    <div
  className="
    mt-5 bg-blue-50 px-14 py-4
    flex flex-col gap-4 items-center
    md:flex-row md:gap-0 md:items-center md:justify-between
  "
>
  <span className="text-blue-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-md font-medium border-2 border-blue-700">
    Why Us
  </span>

  <span className="text-lg md:text-xl font-medium text-gray-800 hover:underline cursor-pointer text-center">
    Trusted on Communities →
  </span>

  <span className="border-2 border-blue-700 text-blue-700 px-6 py-3 md:px-8 md:py-4 rounded-full text-md font-medium">
    Our Features
  </span>
</div>
    </section>
  )
}

export default Students
