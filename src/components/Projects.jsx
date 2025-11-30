import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const projectsData = [
  {
    title: "Food Recommendation Agent",
    tech: ["LangChain", "ChromaDB", "Python", "RAG"],
    desc: "Built a RAG-based chatbot for personalized diet plans. Included calorie tracking with Pandas, achieving 95% accuracy in nutrition reports."
  },
  {
    title: "LinkedIn Profile Summarizer",
    tech: ["Agentic AI", "LLMs", "LangChain", "Automation"],
    desc: "Automated profile parsing and skill extraction, enabling recruiters to save 50% time in candidate screening."
  },
  {
    title: "PDF to Podcast Converter",
    tech: ["Hugging Face", "spaCy", "gTTS", "NLP"],
    desc: "Summarized text with Transformers and converted to audio, improving accessibility for 50+ research documents."
  },
  {
    title: "Library Management System",
    tech: ["SQL", "Database Design", "Normalization"],
    desc: "Designed normalized schema and optimized queries, reducing record retrieval time by 60% and cutting manual tracking by 70%."
  },
  {
    title: "House Price Prediction",
    tech: ["XGBoost", "Linear Regression", "ML"],
    desc: "Trained regression models achieving 85% R² on structured datasets with feature engineering and hyperparameter tuning."
  }
];

const Projects = ({ onBack }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  // Entry Animation
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(containerRef.current, {
      y: "100vh",
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Stagger in the project cards
    tl.from(".project-card", {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)"
    }, "-=0.4");

  }, { scope: containerRef });

  // Scroll-to-back logic
  useEffect(() => {
    const handleWheel = (e) => {
      const element = scrollRef.current;
      if (!element) return;
      if (e.deltaY < -30 && element.scrollTop <= 0) {
        onBack(); 
      }
    };
    const scrollContainer = scrollRef.current;
    if (scrollContainer) scrollContainer.addEventListener('wheel', handleWheel);
    return () => {
      if (scrollContainer) scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, [onBack]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-50 p-4 md:p-8">
      
      {/* GLASS CONTAINER */}
      <div 
        ref={scrollRef}
        className="w-full max-w-6xl h-[85vh] bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-y-auto relative p-8 md:p-12 custom-scrollbar"
      >
        
        {/* NAV HEADER */}
        <div className="flex justify-between items-center mb-10 sticky top-0 bg-black/80 backdrop-blur-md p-4 -mx-4 -mt-4 rounded-xl border-b border-white/10 z-20">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-hero-red font-bold tracking-widest text-sm transition-colors"
          >
            ← BACK TO MENU
          </button>
          <h2 className="text-2xl font-raimi tracking-wide text-white hidden md:block">PROJECTS</h2>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <div 
              key={index}
              className="project-card group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-hero-red/50 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white font-sans group-hover:text-hero-red transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-4xl opacity-10 font-raimi text-white">{`0${index + 1}`}</span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
              </div>

              {/* Tags & Link */}
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tag, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-1 rounded bg-black/50 border border-white/10 text-hero-blue">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href="https://github.com/arnavsharma2716" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center text-xs font-bold tracking-widest text-white/70 hover:text-white uppercase group-hover:underline decoration-hero-red underline-offset-4"
                >
                  View Code →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs font-mono text-gray-600">
          ARCHIVE // 2024-2025
        </div>

      </div>
    </div>
  );
};

export default Projects;