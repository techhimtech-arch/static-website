import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { title: "Home", href: "#hero" },
  { title: "About", href: "#about" },
  { title: "Campus", href: "#gallery" },
  { title: "Academics", href: "#academics" },
  { title: "Values", href: "#values" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-[50000] transition-all duration-500 ${
          isScrolled ? 'py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-lg' : 'py-8 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" onClick={(e) => scrollToSection(e, '#hero')} className="hover-target text-slate-900 dark:text-white flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <span className="font-display font-black text-xl text-white">G</span>
            </div>
            <span className="font-display font-bold text-xl tracking-wide hidden sm:block">GURUKUL</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.title} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="hover-target text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-white text-sm uppercase tracking-widest font-semibold transition-colors relative group"
              >
                {link.title}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            <button 
              onClick={toggleTheme} 
              className="hover-target ml-2 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hover-target ml-2 px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-brand-500 dark:hover:bg-brand-500 transition-colors duration-300 shadow-lg hover:shadow-brand-500/50"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-slate-700 dark:text-slate-300"
            >
              {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </button>
            <button 
              className="text-slate-900 dark:text-white p-2 focus:outline-none"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-[60000] bg-white dark:bg-slate-950 flex flex-col justify-center items-center"
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.6, type: 'spring', damping: 20 }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />

            <button 
              className="absolute top-8 right-6 text-slate-900 dark:text-white p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>

            <div className="flex flex-col items-center gap-8 w-full px-6 relative z-10">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.title}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-4xl font-display font-black text-slate-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, type: 'spring' }}
                >
                  {link.title}
                </motion.a>
              ))}
              <motion.button
                onClick={(e) => scrollToSection(e, '#contact')}
                className="mt-8 px-10 py-4 bg-brand-500 text-white rounded-full font-bold text-xl uppercase tracking-wider w-full max-w-xs text-center shadow-xl shadow-brand-500/30"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.1, type: 'spring' }}
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
