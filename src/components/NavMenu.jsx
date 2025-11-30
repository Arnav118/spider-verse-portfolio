import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 1. DEFINED IDs FOR NAVIGATION
const menuItems = [
  { label: "ABOUT ME", id: "about" },
  { label: "PROJECTS", id: "projects" },
  { label: "RESUME", id: "resume" },
  { label: "CONTACT", id: "contact" },
];

const NavMenu = ({ show, onNavigate }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (show) {
      gsap.fromTo(".nav-item", 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }
  }, { scope: containerRef, dependencies: [show] });

  if (!show) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="flex gap-6 pointer-events-auto">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            // 2. RESTORED ONCLICK EVENT
            onClick={() => onNavigate(item.id)}
            className="nav-item relative px-10 py-4 text-white font-raimi italic tracking-wider text-lg overflow-hidden group transition-all duration-300
                       bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/80 hover:bg-black/80 hover:scale-105"
            style={{ opacity: 0 }} 
          >
            <span className="relative z-10 drop-shadow-md">{item.label}</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;