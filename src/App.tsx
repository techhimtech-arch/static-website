import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import AchievementStats from './components/AchievementStats';
import PrincipalsMessage from './components/PrincipalsMessage';
import StudentAchievements from './components/StudentAchievements';
import FacultyExcellence from './components/FacultyExcellence';
import Gallery from './components/Gallery';
import Academics from './components/Academics';
import CoreValues from './components/CoreValues';
import VirtualCampusTour from './components/VirtualCampusTour';
import EventsAnnouncements from './components/EventsAnnouncements';
import Testimonials from './components/Testimonials';
import AdmissionProcess from './components/AdmissionProcess';
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
      className="fixed inset-0 z-[100000] bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 flex flex-col justify-center items-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Animated background orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
        }}
        animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, transparent 70%)',
          bottom: '-5%',
          right: '-5%',
        }}
        animate={{ scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Morphing Logo */}
      <motion.div
        className="relative w-36 h-36 mb-12"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-500 via-cyan-500 to-gold-500 rounded-3xl"
          animate={{
            borderRadius: ['24px', '50%', '24px', '50%'],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-2 bg-navy-900 rounded-2xl"
          animate={{ borderRadius: ['16px', '50%', '16px', '50%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <span className="text-6xl font-display font-black bg-gradient-to-br from-white via-brand-200 to-gold-300 bg-clip-text text-transparent">G</span>
        </motion.div>
      </motion.div>

      {/* Text with shimmer effect */}
      <div className="overflow-hidden mb-4 text-center px-6">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white relative"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="relative inline-block">
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
          className="text-brand-400 tracking-[0.2em] text-xs sm:text-sm uppercase font-medium"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          Modernity With Tradition
        </motion.p>
      </div>

      {/* Progress Bar */}
      <div className="w-64 sm:w-80 h-1.5 bg-navy-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 via-cyan-400 to-gold-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <motion.div
        className="flex items-center gap-3 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-slate-400 text-sm font-mono">
          {Math.min(Math.round(progress), 100)}%
        </span>
      </motion.div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <div className="w-full bg-cream-50 dark:bg-navy-950 text-navy-900 dark:text-slate-50 font-sans cursor-none overflow-x-hidden selection:bg-brand-500 selection:text-white transition-colors duration-500">
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
            <AchievementStats />
            <PrincipalsMessage />
            <StudentAchievements />
            <FacultyExcellence />
            <Gallery />
            <Academics />
            <CoreValues />
            <VirtualCampusTour />
            <EventsAnnouncements />
            <Testimonials />
            <AdmissionProcess />
            <ContactForm />
            <Footer />
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
