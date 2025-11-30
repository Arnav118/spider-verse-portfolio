import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Contact = ({ onBack }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate in from bottom (Symbiote style - slightly elastic)
    gsap.from(containerRef.current, {
      y: "100vh",
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-50 p-4">
      
      {/* VENOM GLASS CARD */}
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-3xl shadow-[0_0_50px_rgba(100,0,200,0.2)] p-8 md:p-12 relative overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onBack}
          className="absolute top-6 right-6 text-white/50 hover:text-white font-bold text-sm tracking-widest border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all"
        >
          CLOSE
        </button>

        {/* Header */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 font-raimi tracking-wide drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
          CONTACT ME
        </h2>
        <p className="text-gray-300 mb-10 text-lg">
          "We are Venom... but we are open to work."
        </p>

        {/* Social Links Grid */}
        <div className="grid gap-4">
          
          {/* GitHub */}
          <a href="https://github.com/Arnav118" target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-black rounded-full border border-white/20 mr-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🐙</span> {/* Replace with SVG if preferred */}
            </div>
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm">GITHUB</h3>
              <p className="text-gray-400 text-sm">Check out my repos</p>
            </div>
          </a>

          {/* LinkedIn / Instagram */}
          <a href="https://instagram.com/arnavsharma375" target="_blank" rel="noopener noreferrer" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-black rounded-full border border-white/20 mr-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📸</span>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm">INSTAGRAM</h3>
              <p className="text-gray-400 text-sm">Follow the journey</p>
            </div>
          </a>

          {/* Email */}
          <a href="mailto:arnavsharma.2716@gmail.com" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-black rounded-full border border-white/20 mr-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">✉️</span>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm">EMAIL</h3>
              <p className="text-gray-400 text-sm">arnavsharma.2716@gmail.com</p>
            </div>
          </a>

          {/* Mobile */}
          <a href="tel:+919971553415" className="group flex items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-500 transition-all duration-300 cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center bg-black rounded-full border border-white/20 mr-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📞</span>
            </div>
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm">PHONE</h3>
              <p className="text-gray-400 text-sm">+91-9971553415</p>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
};

export default Contact;