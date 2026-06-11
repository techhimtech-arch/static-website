import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

// Split Text Component for character animation
const SplitText: React.FC<{ text: string; className?: string; delay?: number }> = ({ text, className = '', delay = 0 }) => {
  const chars = text.split('');

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 100, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-badge',
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.2, delay: 0.5, ease: "elastic.out(1, 0.5)" }
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
      {/* Dramatic 3D Grid Floor Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] h-[50vh] origin-bottom"
          style={{
            background: 'linear-gradient(to top, rgba(14,165,233,0.3) 0%, transparent 100%)',
            transform: 'perspective(500px) rotateX(60deg)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(14,165,233,0.1) 0px, transparent 1px, transparent 40px),
              repeating-linear-gradient(90deg, rgba(14,165,233,0.1) 0px, transparent 1px, transparent 40px)
            `,
            backgroundSize: '100% 100%',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom',
          }}
        />
      </div>

      {/* Multi-layered animated orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, rgba(56,189,248,0.1) 50%, transparent 70%)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{
            x: [0, 150, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(192,132,252,0.1) 50%, transparent 70%)',
            bottom: '-10%',
            right: '-5%',
          }}
          animate={{
            x: [0, -100, 0],
            y: [0, -150, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 70%)',
            top: '40%',
            right: '20%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              border: '1px solid rgba(14,165,233,0.2)',
              borderRadius: i % 2 === 0 ? '50%' : '8px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center px-4 mt-12"
        style={{ y, opacity, scale }}
      >
        {/* Animated Badge */}
        <motion.div
          className="hero-badge mb-10 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
          whileHover={{ scale: 1.05, borderColor: 'rgba(14,165,233,0.5)' }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-brand-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-brand-300 text-sm font-medium tracking-widest uppercase">Admissions Open 2026-27</span>
          <motion.div
            className="w-2 h-2 rounded-full bg-brand-400"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>

        {/* Main Title with Split Text */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-display font-black text-white tracking-tighter mb-2 leading-[0.9]">
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.3 }}
          >
            <SplitText text="FUTURE" delay={0.3} />
          </motion.span>
          <motion.span
            className="block overflow-hidden bg-gradient-to-r from-brand-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.9 }}
          >
            <SplitText text="READY" delay={0.9} />
          </motion.span>
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 1.5 }}
          >
            <SplitText text="EDUCATION" delay={1.5} />
          </motion.span>
        </h1>

        {/* Animated subtitle */}
        <motion.div
          className="overflow-hidden mb-12 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.p className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Empowering the next generation with{' '}
            <motion.span
              className="text-white font-medium inline-block"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >innovation</motion.span>,{' '}
            <motion.span
              className="text-brand-400 font-medium inline-block"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >excellence</motion.span>, and{' '}
            <motion.span
              className="text-cyan-400 font-medium inline-block"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >character</motion.span>.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          <MagneticButton
            className="relative px-12 py-5 bg-gradient-to-r from-brand-500 to-cyan-500 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_40px_rgba(14,165,233,0.5)] hover:shadow-[0_0_60px_rgba(14,165,233,0.7)] flex items-center gap-3 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              Apply Now
              <motion.span
                animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </MagneticButton>

          <MagneticButton
            className="relative px-10 py-5 bg-transparent text-white rounded-full font-bold text-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-3 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  ▶
                </motion.span>
              </span>
              Virtual Tour
            </span>
          </MagneticButton>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 1 }}
        >
          {[
            { value: '30+', label: 'Years of Excellence' },
            { value: '2500+', label: 'Students' },
            { value: '100%', label: 'Results' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3.3 + i * 0.1 }}
            >
              <motion.p
                className="text-3xl sm:text-4xl font-display font-black text-white"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <motion.span
          className="text-slate-500 text-xs uppercase tracking-[0.3em] font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          className="w-6 h-12 rounded-full border border-slate-700 flex justify-center pt-2"
          animate={{ borderColor: ['rgba(100,116,139,0.5)', 'rgba(14,165,233,0.8)', 'rgba(100,116,139,0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-brand-400 rounded-full"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0.3, 1]
            }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
