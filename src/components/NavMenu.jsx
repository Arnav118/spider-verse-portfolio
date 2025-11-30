import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 1. UPDATE: Added 'link' properties to connect to the sections
const menuItems = [
  { label: "ABOUT ME", link: "#about" },
  { label: "PROJECTS", link: "#projects" },
  { label: "RESUME", link: "#resume" },
  { label: "CONTACT", link: "#contact" },
];

const NavMenu = ({ show }) => {
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

  // Optional: smooth scroll handler
  const handleScroll = (e, link) => {
    e.preventDefault();
    const target = document.querySelector(link);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!show) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="flex gap-6 pointer-events-auto">
        {menuItems.map((item, index) => (
          // 2. UPDATE: Changed <button> to <a>
          <a 
            key={index}
            href={item.link}
            onClick={(e) => handleScroll(e, item.link)} // Adds smooth scrolling
            className="nav-item relative px-10 py-4 text-white font-raimi tracking-wider text-lg overflow-hidden group transition-all duration-300
                       bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/80 hover:bg-black/80 hover:scale-105 cursor-pointer block text-center no-underline"
            style={{ opacity: 0 }} 
          >
            <span className="relative z-10">{item.label}</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavMenu;