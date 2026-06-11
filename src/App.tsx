import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Gallery from './components/Gallery';
import Academics from './components/Academics';
import CoreValues from './components/CoreValues';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-slate-950 flex flex-col justify-center items-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Morphing Logo */}
      <motion.div
        className="relative w-32 h-32 mb-12"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-500 to-cyan-500 rounded-2xl"
          animate={{
            borderRadius: ['16px', '50%', '16px', '50%'],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-5xl font-display font-black text-white">G</span>
        </motion.div>
      </motion.div>

      {/* Text with shimmer effect */}
      <div className="overflow-hidden mb-4">
        <motion.h1
          className="text-3xl md:text-5xl font-display font-black text-white relative"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="relative">
            GURUKUL INTERNATIONAL SCHOOL
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%]"
              animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </span>
        </motion.h1>
      </div>

      <div className="overflow-hidden mb-8">
        <motion.p
          className="text-brand-400 tracking-[0.3em] text-sm uppercase"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          Modernity With Tradition
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <motion.p
        className="text-slate-500 text-sm mt-3 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {Math.min(Math.round(progress), 100)}%
      </motion.p>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans cursor-none overflow-x-hidden selection:bg-brand-500 selection:text-white transition-colors duration-500">
        <AnimatePresence mode="wait">
          {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        <Cursor />
        <ParticlesBackground />

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Navbar />
            <Hero />
            <Marquee />
            <About />
            <Gallery />
            <Academics />
            <CoreValues />
            <Testimonials />
            <ContactForm />
            <Footer />
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
