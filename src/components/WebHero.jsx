import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NavMenu from './NavMenu';
import AboutMe from './AboutMe';
import Projects from './Projects'; // Added this back to ensure projects work
import Contact from './Contact';

// IMPORT ASSETS
import spiderBg2 from '../assets/images/spiderbg2.jpg'; 
import venomBg from '../assets/images/venom-bg.jpg'; 
import venomVideo from '../assets/videos/venom.mp4'; 

// --- 1. SPIDER ASSET ---
const SpiderIcon = ({ className }) => (
  <div className={className}>
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full drop-shadow-2xl">
      <ellipse cx="50" cy="38" rx="8" ry="9" />
      <path d="M50 48 C 35 48, 28 65, 32 78 C 35 88, 42 92, 50 92 C 58 92, 65 88, 68 78 C 72 65, 65 48, 50 48 Z" />
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M45 35 L 30 20 L 20 25 L 10 15" />
        <path d="M42 40 L 20 35 L 10 45" />
        <path d="M42 45 L 20 55 L 10 50" />
        <path d="M45 42 L 30 70 L 20 85 L 15 95" />
        <path d="M55 35 L 70 20 L 80 25 L 90 15" />
        <path d="M58 40 L 80 35 L 90 45" />
        <path d="M58 45 L 80 55 L 90 50" />
        <path d="M55 42 L 70 70 L 80 85 L 85 95" />
      </g>
      <path d="M48 30 L 46 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 30 L 54 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
);

// --- 2. BACKGROUND LOGO ---
const BackgroundLogo = ({ isVenom }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
    <svg 
      viewBox="0 0 500 500" 
      fill={isVenom ? "#4c1d95" : "black"} 
      className={`w-[90%] md:w-[60%] transition-colors duration-1000 ${isVenom ? 'opacity-20' : 'opacity-10'}`}
    >
      <g transform="translate(250, 250) scale(1.2)">
        <path d="M0 -30 L -15 -60 L 0 -80 L 15 -60 Z" /> 
        <path d="M0 -20 L -20 40 L 0 90 L 20 40 Z" />   
        <g stroke={isVenom ? "#4c1d95" : "black"} strokeWidth="12" strokeLinecap="round" fill="none" className="transition-colors duration-1000">
          <path d="M-15 -50 L -60 -100 L -40 -180" />
          <path d="M15 -50 L 60 -100 L 40 -180" />
          <path d="M-15 -40 L -90 -60 L -120 -140" />
          <path d="M15 -40 L 90 -60 L 120 -140" />
          <path d="M-15 -30 L -90 10 L -120 120" />
          <path d="M15 -30 L 90 10 L 120 120" />
          <path d="M-10 -20 L -50 50 L -40 160" />
          <path d="M10 -20 L 50 50 L 40 160" />
        </g>
      </g>
    </svg>
  </div>
);

// --- 3. MAIN CONTROLLER ---
const WebHero = () => {
  const containerRef = useRef(null);
  const initialsRef = useRef(null);
  const homeContentRef = useRef(null); 

  // Physics Refs
  const strand1Ref = useRef(null);
  const strand2Ref = useRef(null);
  const strand3Ref = useRef(null);
  const strand4Ref = useRef(null);
  const strand5Ref = useRef(null);
  const connect1Ref = useRef(null);
  const connect2Ref = useRef(null);
  const connect3Ref = useRef(null);
  const connect4Ref = useRef(null);
  const connect5Ref = useRef(null);
  const connect6Ref = useRef(null);
  
  const spider1Ref = useRef(null);
  const spider2Ref = useRef(null);
  const spider3Ref = useRef(null);

  // STATE
  const [introFinished, setIntroFinished] = useState(false);
  const [activeView, setActiveView] = useState('home'); 

  const { contextSafe } = useGSAP({ scope: containerRef });
  const webState = useRef({ endX: window.innerWidth / 2, endY: -100, controlY: -100, spread: 0 });

  // --- START SPIDERS ---
  useGSAP(() => {
    gsap.to([spider1Ref.current, spider2Ref.current, spider3Ref.current], { opacity: 0.6, duration: 1, stagger: 0.2 });
    scurrySpider(spider1Ref.current);
    scurrySpider(spider2Ref.current);
    scurrySpider(spider3Ref.current);
  }, { scope: containerRef });

  // --- RENDER WEB ---
  const renderWeb = () => {
    const startX = window.innerWidth / 2;
    const startY = -20; 
    const { endX, endY, controlY, spread } = webState.current;
    const drawVertical = (endOffset, controlOffset) => {
      const currentSpread = spread * endOffset;
      return `M ${startX} ${startY} Q ${startX + (controlOffset * spread)} ${controlY} ${endX + currentSpread} ${endY}`;
    };
    const getPointOnStrand = (endOffset, controlOffset, t) => {
      const p0x = startX, p0y = startY;
      const p1x = startX + (controlOffset * spread), p1y = controlY;
      const p2x = endX + (spread * endOffset), p2y = endY;
      const x = (1-t)*(1-t)*p0x + 2*(1-t)*t*p1x + t*t*p2x;
      const y = (1-t)*(1-t)*p0y + 2*(1-t)*t*p1y + t*t*p2y;
      return { x, y };
    };
    const drawConnection = (strandA_params, strandB_params, t1, t2, wobble) => {
      const pA = getPointOnStrand(...strandA_params, t1);
      const pB = getPointOnStrand(...strandB_params, t2);
      return `M ${pA.x} ${pA.y} Q ${(pA.x+pB.x)/2} ${(pA.y+pB.y)/2 + wobble} ${pB.x} ${pB.y}`;
    };
    if (strand1Ref.current) {
      strand1Ref.current.setAttribute("d", drawVertical(0, 0)); 
      strand2Ref.current.setAttribute("d", drawVertical(15, 0));
      strand3Ref.current.setAttribute("d", drawVertical(-15, 0));
      strand4Ref.current.setAttribute("d", drawVertical(40, 5));
      strand5Ref.current.setAttribute("d", drawVertical(-40, -5));
      connect1Ref.current.setAttribute("d", drawConnection([15,0], [40,5], 0.3, 0.35, 10));
      connect2Ref.current.setAttribute("d", drawConnection([-15,0], [-40,-5], 0.4, 0.45, 10));
      connect3Ref.current.setAttribute("d", drawConnection([0,0], [15,0], 0.6, 0.65, 5));
      connect4Ref.current.setAttribute("d", drawConnection([0,0], [-15,0], 0.7, 0.75, 5));
      connect5Ref.current.setAttribute("d", drawConnection([15,0], [40,5], 0.85, 0.9, 15));
      connect6Ref.current.setAttribute("d", drawConnection([-15,0], [-40,-5], 0.2, 0.25, 15));
    }
  };

  const scurrySpider = (target) => {
    if (!target) return;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const endX = Math.random() * screenW;
    const endY = Math.random() * screenH;
    const currentX = gsap.getProperty(target, "x") || 0;
    const currentY = gsap.getProperty(target, "y") || 0;
    const angle = Math.atan2(endY - currentY, endX - currentX) * 180 / Math.PI;
    const tl = gsap.timeline({ onComplete: () => scurrySpider(target) });
    tl.to(target, { rotation: angle + 90, duration: 0.4, ease: "back.out(1.2)" });
    const dist = Math.sqrt(Math.pow(endX - currentX, 2) + Math.pow(endY - currentY, 2));
    const speed = dist / 200; 
    tl.to(target, { x: endX, y: endY, duration: speed, ease: "power1.inOut" });
    tl.to(target, { duration: Math.random() * 2 + 0.5 });
  };

  const handleStart = contextSafe(() => {
    const tl = gsap.timeline({ onUpdate: renderWeb, onComplete: () => setIntroFinished(true) });
    const screenH = window.innerHeight;
    tl.to(webState.current, { endY: screenH / 2, controlY: screenH / 4, spread: 0, duration: 0.15, ease: "power1.in" });
    tl.to(webState.current, { spread: 1.8, duration: 0.1, ease: "elastic.out(1, 0.5)" });
    const headerY = -screenH / 2 + 100; 
    tl.to(initialsRef.current, { y: headerY, scale: 0.6, duration: 0.6, ease: "back.inOut(0.8)" }, "+=0.05");
    tl.to(webState.current, { endY: headerY, controlY: headerY / 2, spread: 0.5, duration: 0.6, ease: "back.inOut(0.8)" }, "<");
  });

  const handleNavigate = contextSafe((viewId) => {
    if (['about', 'contact', 'projects'].includes(viewId)) {
      gsap.to(homeContentRef.current, { y: "-100vh", opacity: 0, duration: 0.8, ease: "power3.in", onComplete: () => setActiveView(viewId) });
    }
  });

  const handleBackToHome = contextSafe(() => {
    setActiveView('home');
    gsap.fromTo(homeContentRef.current, { y: "-100vh", opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
  });

  useEffect(() => {
    const handleResize = () => { webState.current.endX = window.innerWidth / 2; if (!introFinished) renderWeb(); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [introFinished]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* 1. SPIDER-MAN BACKGROUND (BASE LAYER) */}
      <img src={spiderBg2} alt="Spidey Background" className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 transition-opacity duration-1000" />
      
      {/* 2. VENOM BACKGROUND IMAGE (STATIC TEXTURE) */}
      <img 
        src={venomBg} 
        alt="Venom Texture" 
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${activeView === 'contact' ? 'opacity-100' : 'opacity-0'}`} 
      />

      {/* 3. VENOM VIDEO (MOTION OVERLAY) */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${activeView === 'contact' ? 'opacity-100' : 'opacity-0'}`}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          // mix-blend-lighten makes it blend with the image behind it
          className="w-full h-full object-cover mix-blend-lighten opacity-80" 
        >
          <source src={venomVideo} type="video/mp4" />
        </video>
        {/* Dark overlay to ensure text pops */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 4. GRADIENTS */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-0 transition-opacity duration-1000 ${activeView === 'contact' ? 'opacity-0' : 'opacity-100'}`} />
      <div className={`absolute inset-0 bg-gradient-to-b from-black/90 via-purple-900/20 to-black/90 z-0 transition-opacity duration-1000 ${activeView === 'contact' ? 'opacity-100' : 'opacity-0'}`} />

      {/* 5. BACKGROUND LOGO */}
      <BackgroundLogo isVenom={activeView === 'contact'} />

      {/* 6. INTERACTIVE WEB */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        <defs>
          <filter id="sticky-rope">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="goo" in2="noise" scale="3" result="texturedGoo" />
            <feMerge><feMergeNode in="texturedGoo" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#sticky-rope)" stroke="#FFFFFF" strokeLinecap="round" fill="none">
          <path ref={strand1Ref} strokeWidth="4" /> <path ref={strand2Ref} strokeWidth="2" /> <path ref={strand3Ref} strokeWidth="2" /> <path ref={strand4Ref} strokeWidth="2" /> <path ref={strand5Ref} strokeWidth="2" />
          <path ref={connect1Ref} strokeWidth="1.5" opacity="0.8" /> <path ref={connect2Ref} strokeWidth="1.5" opacity="0.8" /> <path ref={connect3Ref} strokeWidth="1.5" opacity="0.8" /> <path ref={connect4Ref} strokeWidth="1.5" opacity="0.8" /> <path ref={connect5Ref} strokeWidth="1.5" opacity="0.6" /> <path ref={connect6Ref} strokeWidth="1.5" opacity="0.6" />
        </g>
      </svg>

      {/* 7. SPIDERS */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div ref={spider1Ref} className={`absolute w-20 h-20 transition-colors duration-1000 ${activeView === 'contact' ? 'text-white opacity-80' : 'text-black opacity-0'}`}> <SpiderIcon className="w-full h-full drop-shadow-2xl" /> </div>
        <div ref={spider2Ref} className={`absolute w-24 h-24 transition-colors duration-1000 ${activeView === 'contact' ? 'text-white opacity-80' : 'text-black opacity-0'}`}> <SpiderIcon className="w-full h-full drop-shadow-2xl" /> </div>
        <div ref={spider3Ref} className={`absolute w-16 h-16 transition-colors duration-1000 ${activeView === 'contact' ? 'text-white opacity-80' : 'text-black opacity-0'}`}> <SpiderIcon className="w-full h-full drop-shadow-2xl" /> </div>
      </div>

      {/* 8. HOME CONTENT */}
      <div ref={homeContentRef} className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-opacity duration-300 ${activeView === 'home' ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <button ref={initialsRef} onClick={handleStart} className="group relative cursor-pointer outline-none mb-16">
          <h1 className="text-5xl md:text-8xl font-bold text-black font-raimi italic tracking-tighter select-none transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_10px_rgba(255,255,255,0.3)]">
            ARNAV SHARMA
          </h1>
          <p className={`absolute -bottom-12 w-full text-center text-white/80 text-sm tracking-widest opacity-0 group-hover:opacity-100 transition-opacity font-bold ${introFinished ? 'hidden' : 'block'}`}>
            INITIATE PROTOCOL
          </p>
        </button>
        <NavMenu show={introFinished} onNavigate={handleNavigate} />
      </div>

      {/* 9. VIEWS */}
      {activeView === 'about' && <AboutMe onBack={handleBackToHome} />}
      {activeView === 'projects' && <Projects onBack={handleBackToHome} />}
      {activeView === 'contact' && <Contact onBack={handleBackToHome} />}

    </div>
  );
};

export default WebHero;