import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Academics from './components/Academics';
import CoreValues from './components/CoreValues';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100000] bg-slate-950 flex flex-col justify-center items-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div 
        className="w-24 h-24 border-t-2 border-brand-500 rounded-full mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <div className="overflow-hidden">
        <motion.h1 
          className="text-4xl font-display font-black text-white"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        >
          GURUKUL INTERNATIONAL SCHOOL
        </motion.h1>
      </div>
      <div className="overflow-hidden mt-2">
        <motion.p
          className="text-brand-400 tracking-[0.3em] text-sm uppercase"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          Modernity With Tradition
        </motion.p>
      </div>
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
        
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Navbar />
            <Hero />
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
