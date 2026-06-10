import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Magnetic Effect State
  const imageRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (!textContainerRef.current) return;
    
    const words = textContainerRef.current.querySelectorAll('.word');
    
    gsap.fromTo(words, 
      { opacity: 0.2, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "top 80%",
          end: "bottom 50%",
          scrub: 1,
        }
      }
    );
  }, []);

  const quote = "Education is not the learning of facts, but the training of the mind to think. We strive to create an environment where every child discovers their true potential.";

  return (
    <section id="about" className="min-h-screen bg-white dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20 relative z-10 overflow-hidden transition-colors duration-500">
      
      {/* Left: Text Reveal */}
      <div className="w-full md:w-1/2 mb-16 md:mb-0 pr-0 md:pr-12">
        <h2 className="text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest text-sm mb-6">About Us</h2>
        <div ref={textContainerRef} className="text-4xl md:text-5xl font-display font-medium leading-tight text-slate-800 dark:text-slate-100">
          {quote.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-3 mb-2">{word}</span>
          ))}
        </div>
        <div className="mt-12">
          <p className="text-xl text-slate-500 dark:text-slate-300 font-medium">Dr. Jane Doe</p>
          <p className="text-slate-400 dark:text-slate-500">Principal</p>
        </div>
      </div>

      {/* Right: Magnetic Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <motion.div 
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className="relative w-full max-w-md aspect-[4/5] rounded-3xl cursor-none hover-target"
        >
          <div 
            className="absolute inset-0 rounded-3xl bg-cover bg-center shadow-2xl transition-all duration-300 pointer-events-none"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80')",
              transform: "translateZ(50px)"
            }}
          />
          {/* Decorative element */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-100 rounded-full mix-blend-multiply blur-2xl opacity-70 -z-10 animate-pulse" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-100 rounded-full mix-blend-multiply blur-2xl opacity-70 -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
        </motion.div>
      </div>

    </section>
  );
};

export default About;
