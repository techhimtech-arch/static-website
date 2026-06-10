import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lightbulb, Trophy, Palette } from 'lucide-react';

const TiltCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; gradient: string; delay: number }> = ({ title, desc, icon, gradient, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative w-full h-[26rem] rounded-[2.5rem] cursor-none hover-target group perspective-[1000px]"
    >
      {/* Background glowing mesh layer */}
      <div 
        className={`absolute inset-0 rounded-[2.5rem] opacity-60 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${gradient} animate-gradient bg-[length:200%_200%] shadow-2xl`}
        style={{ transform: "translateZ(0px)" }}
      />
      
      {/* Inner dark card */}
      <div 
        className="absolute inset-1 bg-slate-950/90 backdrop-blur-xl rounded-[2.3rem] p-10 flex flex-col justify-center items-center text-center backface-hidden border border-white/5"
        style={{ transform: "translateZ(40px)" }}
      >
        <motion.div 
          className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-gradient-to-br ${gradient} p-[2px]`}
          style={{ transform: "translateZ(80px)" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
             {icon}
          </div>
        </motion.div>
        
        <h3 className="text-3xl font-display font-black text-white mb-4 tracking-wide" style={{ transform: "translateZ(60px)" }}>{title}</h3>
        <p className="text-slate-400 leading-relaxed font-light" style={{ transform: "translateZ(30px)" }}>{desc}</p>
      </div>
    </motion.div>
  );
};

const CoreValues: React.FC = () => {
  return (
    <section id="values" className="py-40 bg-slate-950 relative overflow-hidden">
      {/* Dynamic shifting background for the section */}
      <div className="absolute inset-0 opacity-30">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-950 to-slate-950"></div>
      </div>
      
      {/* Floating particles background effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 2px, transparent 2px)', backgroundSize: '100px 100px' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <span className="text-brand-400 text-sm font-bold tracking-widest uppercase">The Foundation</span>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-7xl font-display font-black text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Core Values
          </motion.h2>
          <motion.p 
            className="text-slate-400 text-xl max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Pillars that shape the character, ambition, and future of every student who walks through our doors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 perspective-[2000px]">
          <TiltCard 
            title="Innovation" 
            desc="Fostering creative problem-solving and forward-thinking methodologies to tackle tomorrow's challenges."
            icon={<Lightbulb className="w-10 h-10 text-white" />}
            gradient="from-brand-500 via-blue-500 to-indigo-500"
            delay={0}
          />
          <TiltCard 
            title="Sports" 
            desc="Building resilience, teamwork, and physical excellence through world-class athletic programs."
            icon={<Trophy className="w-10 h-10 text-white" />}
            gradient="from-emerald-500 via-teal-500 to-cyan-500"
            delay={0.2}
          />
          <TiltCard 
            title="Arts" 
            desc="Nurturing self-expression, culture, and aesthetic appreciation in a diverse creative environment."
            icon={<Palette className="w-10 h-10 text-white" />}
            gradient="from-purple-500 via-fuchsia-500 to-pink-500"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
