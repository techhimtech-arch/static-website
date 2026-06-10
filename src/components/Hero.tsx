import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry Animation: text-masking animation with GSAP Stagger
      gsap.fromTo(
        textRefs.current,
        { y: 150, rotate: 10, opacity: 0 },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950"
    >
      {/* Advanced Animated Mesh Background */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-screen pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-[10%] left-[20%] w-[40rem] h-[40rem] bg-brand-600/40 rounded-full blur-[120px]"
          animate={{ 
            x: [0, 100, -50, 0], 
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-[10%] right-[20%] w-[35rem] h-[35rem] bg-indigo-600/40 rounded-full blur-[120px]"
          animate={{ 
            x: [0, -100, 50, 0], 
            y: [0, 100, -50, 0],
            scale: [1, 0.8, 1.2, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-[40%] left-[50%] w-[25rem] h-[25rem] bg-purple-600/30 rounded-full blur-[100px]"
          animate={{ 
            x: [0, 50, -50, 0], 
            y: [0, 50, -50, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 text-center px-4 mt-12">
        <motion.div 
          className="mb-8 inline-block"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <div className="w-24 h-24 mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500 hover-target cursor-none">
            <span className="text-4xl font-display font-black text-brand-400 block -rotate-12">H</span>
          </div>
        </motion.div>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-white tracking-tighter mb-6 leading-none">
          <span className="inline-block overflow-hidden pb-4">
            <span ref={el => { textRefs.current[0] = el; }} className="inline-block origin-bottom-left">Future</span>
            <span ref={el => { textRefs.current[1] = el; }} className="inline-block ml-4 md:ml-8 text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400 origin-bottom-left">Ready</span>
          </span>
          <br />
          <span className="inline-block overflow-hidden pb-4">
            <span ref={el => { textRefs.current[2] = el; }} className="inline-block origin-bottom-left">Education</span>
          </span>
        </h1>
        
        <div className="overflow-hidden mb-12">
          <p className="text-xl md:text-3xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            <span ref={el => { textRefs.current[3] = el; }} className="inline-block">
              Empowering the next generation with <span className="text-white font-medium">innovation</span>, <span className="text-white font-medium">excellence</span>, and <span className="text-white font-medium">character</span>.
            </span>
          </p>
        </div>

        <div className="overflow-hidden">
          <div ref={el => { textRefs.current[4] = el; }} className="inline-block">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover-target px-10 py-5 bg-white text-slate-950 rounded-full font-bold text-lg transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] flex items-center gap-3 mx-auto"
            >
              Discover More
              <motion.span 
                animate={{ x: [0, 5, 0] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Scroll</span>
        <div className="w-[2px] h-16 bg-white/10 overflow-hidden">
          <motion.div 
            className="w-full h-full bg-brand-500 origin-top"
            animate={{ scaleY: [0, 1, 0], translateY: ['-100%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
