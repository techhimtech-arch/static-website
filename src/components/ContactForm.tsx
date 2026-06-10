import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { CheckCircle, Send, MapPin } from 'lucide-react';

const InputField: React.FC<{ type: string; id: string; label: string; as?: 'input' | 'textarea'; delay: number }> = ({ type, id, label, as: Component = 'input', delay }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <motion.div 
      className="relative mb-10"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Component
        type={type}
        id={id}
        required
        onFocus={() => setIsFocused(true)}
        onBlur={(e: any) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        className={`w-full bg-transparent border-b-2 ${isFocused ? 'border-brand-500' : 'border-slate-300 dark:border-slate-600'} text-slate-800 dark:text-white focus:outline-none py-3 transition-colors duration-300 font-medium ${Component === 'textarea' ? 'resize-none h-24' : ''}`}
      />
      <label
        htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none text-slate-500 dark:text-slate-400 ${
          isFocused || hasValue ? '-top-6 text-xs text-brand-500 dark:text-brand-400 font-bold tracking-widest uppercase' : 'top-3 text-base'
        }`}
      >
        {label}
      </label>
      
      {/* Animated underline focus effect */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-brand-500 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Magnetic button state
  const btnRef = useRef<HTMLButtonElement>(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const btnSpringX = useSpring(bx, { stiffness: 150, damping: 15, mass: 0.1 });
  const btnSpringY = useSpring(by, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    bx.set(mouseX * 0.3); // Magnetic pull strength
    by.set(mouseY * 0.3);
  };

  const handleBtnMouseLeave = () => {
    bx.set(0);
    by.set(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }, 2000); 
  };

  return (
    <section id="contact" className="py-40 bg-slate-50 dark:bg-slate-900 relative flex justify-center items-center overflow-hidden transition-colors duration-500">
      {/* Animated Decorative blobs */}
      <motion.div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-300 dark:bg-brand-900/40 rounded-full mix-blend-multiply blur-[100px] opacity-40 -z-10"
        animate={{ 
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-300 dark:bg-indigo-900/40 rounded-full mix-blend-multiply blur-[100px] opacity-40 -z-10"
        animate={{ 
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.5, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="w-full max-w-7xl relative z-10 px-6">
        <div className="bg-white/40 dark:bg-slate-950/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-2xl rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row">
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

          {/* Left Side: Interactive Map Visual */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale opacity-60 dark:opacity-40 hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80")' }}
            ></div>
            <div className="absolute inset-0 bg-brand-500/10 dark:bg-slate-900/40"></div>
            
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center shadow-2xl mb-4 relative">
                <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-50"></div>
                <MapPin className="w-8 h-8 text-white relative z-10" />
              </div>
              <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-xl text-center">
                <h4 className="font-bold text-slate-900 dark:text-white">Himtech Campus</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">Tech City, TC 45678</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full lg:w-1/2 p-12 md:p-16 lg:p-20">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="relative z-10"
                >
                  <div className="mb-14">
                    <motion.h2 
                      className="text-4xl md:text-5xl font-display font-black text-slate-800 dark:text-white mb-4 tracking-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      Join the Future
                    </motion.h2>
                    <motion.p 
                      className="text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase text-sm"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      Admissions open for 2026-2027
                    </motion.p>
                  </div>

                  <InputField type="text" id="name" label="Student's Full Name" delay={0.1} />
                  <InputField type="email" id="email" label="Parent's Email Address" delay={0.2} />
                  <InputField type="tel" id="phone" label="Contact Number" delay={0.3} />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="mt-12"
                  >
                    <motion.button 
                      ref={btnRef}
                      disabled={isSubmitting}
                      onMouseMove={handleBtnMouseMove}
                      onMouseLeave={handleBtnMouseLeave}
                      style={{ x: btnSpringX, y: btnSpringY }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full md:w-auto hover-target px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg transition-all duration-300 relative overflow-hidden group disabled:opacity-70 shadow-2xl hover:shadow-brand-500/50 flex justify-center items-center gap-3 cursor-none"
                    >
                      <span className={`relative z-10 ${isSubmitting ? 'opacity-0' : 'opacity-100'} transition-opacity flex items-center gap-3 group-hover:text-white dark:group-hover:text-white`}>
                        Submit Application <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                      
                      {/* Hover fill effect */}
                      <div className="absolute inset-0 bg-brand-500 scale-0 group-hover:scale-100 origin-center transition-transform duration-500 ease-out rounded-full -z-0"></div>

                      {isSubmitting && (
                        <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-900 dark:bg-white">
                          <div className="w-6 h-6 border-3 border-white/30 dark:border-slate-900/30 border-t-white dark:border-t-slate-900 rounded-full animate-spin"></div>
                        </div>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  >
                    <CheckCircle className="w-32 h-32 text-brand-500 mb-8 filter drop-shadow-[0_0_20px_rgba(14,165,233,0.4)]" />
                  </motion.div>
                  <motion.h3 
                    className="text-4xl font-display font-black text-slate-800 dark:text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Application Received!
                  </motion.h3>
                  <motion.p 
                    className="text-slate-500 dark:text-slate-400 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Welcome to the future. We will be in touch with you shortly.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
