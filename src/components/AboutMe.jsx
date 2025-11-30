import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import peterImg from '../assets/images/peter.png'; 

// Added 'onBack' prop to return to home
const AboutMe = ({ onBack }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate the card SLIDING UP from the bottom
    gsap.from(containerRef.current, {
      y: "100vh",
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-50 p-4 md:p-12 overflow-y-auto">
      
      {/* THE GLASS CARD */}
      <div className="w-full max-w-6xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onBack}
          className="absolute top-4 right-4 z-50 text-white/50 hover:text-white font-bold text-xl p-2"
        >
          ✕ CLOSE
        </button>

        {/* LEFT: IMAGE */}
        <div className="w-full md:w-1/3 relative h-64 md:h-auto">
          <img src={peterImg} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r" />
        </div>

        {/* RIGHT: CONTENT */}
        <div className="w-full md:w-2/3 p-8 md:p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-bold font-raimi tracking-wide text-hero-red mb-6 drop-shadow-lg">
            YOUR FRIENDLY NEIGHBORHOOD <br /> 
            <span className="text-white">DATA ANALYST</span>
          </h2>

          <div className="space-y-4 text-gray-300 font-sans leading-relaxed text-lg">
            <p className="border-l-4 border-hero-blue pl-4">
              Just like Peter Parker balances high school with saving New York, I balance my final years as an 
              <span className="text-hero-blue font-bold"> Electronics & Communication Engineer</span> at 
              <span className="text-white font-bold"> VIT Chennai</span> with mastering the world of Data and AI.
            </p>
            <p>
              I don’t get bitten by radioactive spiders; I get powered by <strong className="text-white">Python, SQL, and Coffee</strong>.
            </p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-hero-red font-bold font-raimi">SPIDEY-SENSE</h3>
              <p className="text-sm text-gray-400">Predictive AI & RAG</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h3 className="text-hero-blue font-bold font-raimi">WEB-SHOOTERS</h3>
              <p className="text-sm text-gray-400">Python, SQL, Java</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutMe;