import React from 'react'
import teach1 from '../assets/teach1.jpg'
import teach2 from '../assets/teach2.jpg'
import teach3 from '../assets/teach3.jpg'
import teach4 from '../assets/teach4.webp'

const Teachers = () => {
  return (
    <section id="teachers" className="py-10">
      <div className="max-w-8xl mx-auto px-6">

        {/* TOP CARD GRID */}
        <div className="bg-gray-50 rounded-[40px] p-12 md:p-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <div className="bg-gray-200 rounded-2xl h-60 overflow-hidden">
                <img
                  src={teach1}
                  alt="Customer History"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="bg-gray-200 rounded-2xl p-5 text-lg font-semibold">
                You lead the way. Students stay perfectly in sync with your navigation.
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <div className="bg-gray-200 rounded-2xl p-5 text-lg font-semibold">
                Reveal aggregated results to the class with a single click to celebrate progress. Let Zing suggest questions based on your slide content to save you prep time.
              </div>

              <div className="bg-gray-200 rounded-2xl h-56 overflow-hidden">
                <img
                  src={teach2}
                  alt="All in one tailoring app"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="bg-gray-200 rounded-2xl min-h-[280px] overflow-hidden">
              <img
                src={teach4}
                alt="Tailoring management dashboard"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-6">
              <div className="bg-gray-200 rounded-2xl h-60 overflow-hidden">
                <img
                  src={teach3}
                  alt="Seamless tailoring experience"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="bg-gray-200 rounded-2xl p-5 text-lg font-semibold">
                See student responses as they happen. No more waiting to find out who understands the lesson.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Teachers
