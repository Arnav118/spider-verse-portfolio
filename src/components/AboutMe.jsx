import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AboutMe = ({ onBack }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // 1. ENTRY ANIMATION
  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: "100vh",
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  // 2. SCROLL-BACK LOGIC
  useEffect(() => {
    const handleWheel = (e) => {
      const element = scrollRef.current;
      if (!element) return;
      // If scrolling UP at the top -> Go Back
      if (e.deltaY < -30 && element.scrollTop <= 0) {
        onBack(); 
      }
    };
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [onBack]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-50 p-4 md:p-8">
      
      {/* GLASS CARD CONTAINER */}
      <div 
        ref={scrollRef}
        className="w-full max-w-5xl h-[85vh] bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-y-auto relative p-8 md:p-16 custom-scrollbar"
      >
        
        {/* NAV BAR */}
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-black/80 backdrop-blur-md p-4 -mx-4 -mt-4 rounded-xl border-b border-white/10 z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-hero-red font-bold tracking-widest text-sm transition-colors"
          >
            ← BACK TO MENU
          </button>
          <span className="text-white/30 text-xs font-mono hidden md:block">SCROLL UP TO RETURN</span>
        </div>

        {/* HEADER SECTION */}
        <div className="mb-10 border-l-4 border-hero-red pl-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 font-sans tracking-tight">
            ARNAV SHARMA
          </h2>
          <p className="text-xl text-hero-blue font-medium tracking-wide">
            DATA ANALYST & ENGINEERING STUDENT
          </p>
        </div>

        {/* --- CV / PROFESSIONAL SUMMARY SECTION --- */}
        <div className="space-y-6 text-gray-300 font-sans leading-relaxed text-lg text-justify border-b border-white/10 pb-10 mb-10">
          <p>
            I am a <strong className="text-white">Data Analyst</strong> and Final Year B.Tech student in Electronics and Communication Engineering at <strong className="text-white">Vellore Institute of Technology, Chennai</strong> (CGPA: 7.94). My technical expertise lies in bridging the gap between raw data and actionable intelligence, utilizing a strong foundation in <strong className="text-white">Databases, Statistics, and Cloud Computing</strong>.
          </p>
          <p>
            With advanced proficiency in <strong className="text-white">Python (Pandas, NumPy) and SQL</strong>, I specialize in building predictive models and AI-driven applications. My recent work includes developing RAG-based chatbots using LangChain and automating recruitment workflows with Agentic AI, demonstrating a capacity to solve complex real-world problems.
          </p>
          <p>
            Beyond technical development, I have proven leadership experience as the <strong className="text-white">Marketing Lead for the CloudOps Club</strong>. In this role, I coordinated large-scale Ideathons and webinars, promoting AWS/Oracle cloud usage and helping establish CloudOps as a top-skilled technical club on campus.
          </p>
        </div>

        {/* --- TECHNICAL ARSENAL (Cards) --- */}
        <h3 className="text-white font-bold tracking-widest text-sm mb-6 border-b border-white/10 pb-2 inline-block">
          TECHNICAL ARSENAL
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Core Data */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-hero-blue transition-colors group">
            <h4 className="text-hero-blue font-bold mb-2 text-lg">DATA & CODE</h4>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li>Python (Pandas, NumPy)</li>
              <li>SQL (MySQL)</li>
              <li>Java & C++</li>
              <li>Excel (Advanced)</li>
            </ul>
          </div>

          {/* Card 2: AI & ML */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-hero-red transition-colors group">
            <h4 className="text-hero-red font-bold mb-2 text-lg">AI & ANALYTICS</h4>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li>RAG Pipelines & LangChain</li>
              <li>Agentic AI Workflows</li>
              <li>Predictive Modeling</li>
              <li>Data Cleaning & Stats</li>
            </ul>
          </div>

          {/* Card 3: Vis & Cloud */}
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white transition-colors group">
            <h4 className="text-white font-bold mb-2 text-lg">VISUALIZATION</h4>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li>Power BI & Tableau</li>
              <li>Matplotlib</li>
              <li>AWS & Oracle Cloud</li>
              <li>ChromaDB (Vector DB)</li>
            </ul>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs font-mono text-gray-500">
          <span>LOCATION: DELHI / CHENNAI, INDIA</span>
          <span>STATUS: OPEN TO WORK</span>
        </div>

      </div>
    </div>
  );
};

export default AboutMe;