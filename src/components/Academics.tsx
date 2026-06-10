import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Counter: React.FC<{ end: parseInt | number; suffix: string; label: string; delay: number }> = ({ end, suffix, label, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        const updateCounter = () => {
          start += increment;
          if (start < end) {
            setCount(Math.ceil(start));
            requestAnimationFrame(updateCounter);
          } else {
            setCount(end);
          }
        };
        
        requestAnimationFrame(updateCounter);
      }, delay * 1000);
    }
  }, [isInView, end, delay]);

  return (
    <motion.div 
      ref={ref} 
      className="flex flex-col items-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-brand-100/50 dark:shadow-none border border-slate-50 dark:border-white/5 relative overflow-hidden group hover-target"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -10 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 dark:from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div 
        className="text-5xl md:text-6xl font-display font-black text-brand-500 mb-2 relative z-10"
        animate={isInView ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-sm relative z-10">{label}</div>
    </motion.div>
  );
};

const Academics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return;

    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });
  }, []);

  const timelineEvents = [
    { year: "1995", title: "Foundation", desc: "Established with a vision for excellence." },
    { year: "2005", title: "Expansion", desc: "Added modern labs and sports facilities." },
    { year: "2015", title: "Global Recognition", desc: "Awarded top ranking internationally." },
    { year: "2024", title: "Future Ready", desc: "Integration of AI & Robotics." },
  ];

  return (
    <section id="academics" ref={containerRef} className="py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
      {/* Floating Background Elements */}
      <motion.div 
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-100 dark:bg-brand-900/30 rounded-full mix-blend-multiply blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"
        style={{ y: bgY }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2 
            className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Academics & Growth
          </motion.h2>
          <motion.p 
            className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A journey of continuous excellence and outstanding achievements over the decades.
          </motion.p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          <Counter end={50} suffix="+" label="Classrooms" delay={0} />
          <Counter end={100} suffix="%" label="Results" delay={0.15} />
          <Counter end={2500} suffix="+" label="Students" delay={0.3} />
          <Counter end={150} suffix="+" label="Educators" delay={0.45} />
        </div>

        {/* Timeline SVG Drawing */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical SVG Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5">
            <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute inset-0">
              <path 
                ref={pathRef}
                d={`M 2 0 L 2 10000`} 
                stroke="#0ea5e9" 
                strokeWidth="4" 
                fill="none" 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 w-1 bg-slate-200 -z-10 rounded-full" />
          </div>

          <div className="space-y-32">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100, rotateY: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                style={{ perspective: "1000px" }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                <motion.div 
                  className="absolute left-8 md:left-1/2 w-6 h-6 bg-brand-500 rounded-full md:-ml-3 transform -translate-x-2.5 md:translate-x-0 border-4 border-white shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ delay: 0.4, type: "spring" }}
                />
                
                <div className="ml-20 md:ml-0 md:w-1/2 md:px-16 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-10 bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-white/5 hover-target cursor-none ${index % 2 === 0 ? 'md:text-right md:rounded-tl-none' : 'md:text-left md:rounded-tr-none'}`}
                  >
                    <span className="inline-block px-4 py-1 rounded-full bg-brand-50 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 font-bold text-sm mb-4">{event.year}</span>
                    <h3 className="text-3xl font-display font-black text-slate-800 dark:text-white mb-3">{event.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{event.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academics;
