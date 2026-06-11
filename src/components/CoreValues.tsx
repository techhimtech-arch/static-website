import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lightbulb, Trophy, Palette, Sparkles } from 'lucide-react';

const TiltCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; gradient: string; delay: number }> = ({ title, desc, icon, gradient, delay }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["20deg", "-20deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-20deg", "20deg"]);

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
      initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, type: "spring", bounce: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative w-full h-[28rem] rounded-[2.5rem] cursor-none hover-target group"
    >
      {/* Animated outer glow ring */}
      <motion.div
        className={`absolute -inset-2 rounded-[2.7rem] bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-700`}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Background gradient layer */}
      <motion.div
        className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${gradient} opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
        style={{ transform: "translateZ(0px)" }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner dark card */}
      <div
        className="absolute inset-1 bg-slate-950/95 backdrop-blur-2xl rounded-[2.3rem] p-10 flex flex-col justify-center items-center text-center border border-white/5 group-hover:border-white/10 transition-colors duration-500"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Animated particles in card */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.3rem] opacity-30 group-hover:opacity-60 transition-opacity duration-500">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${gradient}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Icon container */}
        <motion.div
          className={`relative w-28 h-28 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${gradient} p-[2px] shadow-2xl`}
          style={{ transform: "translateZ(80px)" }}
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="relative z-10"
              animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {icon}
            </motion.div>
          </div>
        </motion.div>

        <h3
          className="text-4xl font-display font-black text-white mb-4 tracking-wide bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
          style={{ transform: "translateZ(60px)" }}
        >
          {title}
        </h3>
        <p
          className="text-slate-400 leading-relaxed font-light text-lg max-w-xs"
          style={{ transform: "translateZ(30px)" }}
        >
          {desc}
        </p>

        {/* Decorative corner elements */}
        <motion.div
          className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-white/10 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-white/10 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const CoreValues: React.FC = () => {
  return (
    <section id="values" className="py-48 bg-slate-950 relative overflow-hidden">
      {/* Dynamic shifting background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, 100, 0],
            x: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </div>

      {/* Floating grid pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-brand-400 text-sm font-bold tracking-widest uppercase">The Foundation</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Core Values
          </motion.h2>
          <motion.p
            className="text-slate-400 text-xl max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Pillars that shape the character, ambition, and future of every student who walks through our doors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16" style={{ perspective: "2000px" }}>
          <TiltCard
            title="Innovation"
            desc="Fostering creative problem-solving and forward-thinking methodologies to tackle tomorrow's challenges."
            icon={<Lightbulb className="w-12 h-12 text-white" />}
            gradient="from-brand-500 via-cyan-500 to-blue-500"
            delay={0}
          />
          <TiltCard
            title="Sports"
            desc="Building resilience, teamwork, and physical excellence through world-class athletic programs."
            icon={<Trophy className="w-12 h-12 text-white" />}
            gradient="from-emerald-500 via-teal-500 to-cyan-500"
            delay={0.2}
          />
          <TiltCard
            title="Arts"
            desc="Nurturing self-expression, culture, and aesthetic appreciation in a diverse creative environment."
            icon={<Palette className="w-12 h-12 text-white" />}
            gradient="from-rose-500 via-pink-500 to-fuchsia-500"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
