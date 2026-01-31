import React from 'react'
import { Info } from "lucide-react";
import { motion } from "framer-motion";

import mq1 from '../assets/marq1.webp'
import mq2 from '../assets/marq2.jpg'
import mq3 from '../assets/marq3.jpg'
import mq4 from '../assets/marq4.jpg'
import mq5 from '../assets/marq5.webp'
import mq6 from '../assets/marq6.webp'


const techStack = [
  { name: "Python", logo: mq1 },
  { name: "JavaScript", logo: mq2 },
  { name: "React", logo: mq3 },
  { name: "Pytho", logo: mq4 },
  { name: "JavaScrip", logo: mq5 },
  { name: "Reac", logo: mq6 },
];

const MarqueeRow = ({ reverse = false }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-16 w-max"
        animate={{
          x: reverse ? ["-100%", "0%"] : ["0%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
      >
        {[...techStack, ...techStack, ...techStack].map((tech, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={tech.logo}
              alt={tech.name}
              width={90}
              height={60}
              className="hover:grayscale-0 transition-all duration-300 hover:scale-110"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* 🔹 Main Section */
const MarqueeSection = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">

        {/* <h2 className="text-5xl font-bold text-gray-800 mb-4">
          Tech Stack
        </h2>

        <p className="text-xl text-gray-600 mb-16">
          Real tools used by real software engineers, not classroom simulations.
        </p> */}

        <div className="space-y-10">
          <MarqueeRow />
        </div>

      </div>
    </section>
  );
};

export default MarqueeSection;