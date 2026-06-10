import React from 'react';
import { motion } from 'framer-motion';

const Marquee: React.FC = () => {
  const text = "🏆 Adjudged #1 School for Innovation 2025  |  📢 Admissions Open for 2026-2027  |  ⚽ Annual Sports Meet Registration Now Live  |  ⭐ 100% Board Results for 10 Consecutive Years  |  ";
  
  return (
    <div className="w-full overflow-hidden bg-brand-500 text-white py-3 border-y border-brand-400/30 flex items-center">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        <div className="text-sm md:text-base font-bold tracking-widest uppercase flex items-center pr-10">
          {text}
        </div>
        <div className="text-sm md:text-base font-bold tracking-widest uppercase flex items-center pr-10">
          {text}
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
