import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Quote, Award, GraduationCap, Heart } from 'lucide-react';

const PrincipalsMessage: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const achievements = [
    { icon: Award, label: '25+ Years in Education', value: 'Experience' },
    { icon: GraduationCap, label: 'PhD in Education', value: 'Qualification' },
    { icon: Heart, label: 'Student First', value: 'Philosophy' },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-gradient-to-b from-cream-50 to-white dark:from-navy-950 dark:to-navy-900 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-brand-100 dark:bg-brand-900/20 rounded-full blur-3xl opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gold-100 dark:bg-gold-900/10 rounded-full blur-3xl opacity-40"
          animate={{
            scale: [1, 1.15, 1],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Decorative frame */}
            <div className="relative">
              {/* Outer decorative border */}
              <motion.div
                className="absolute -inset-4 border-2 border-brand-200 dark:border-brand-800 rounded-[3rem]"
                initial={{ rotate: -3, opacity: 0 }}
                animate={isInView ? { rotate: -3, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              {/* Gold accent corner */}
              <motion.div
                className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-gold-500 rounded-tl-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-gold-500 rounded-br-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
              />

              {/* Main image container */}
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                <motion.img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                  alt="Dr. Padma Sharma, Principal"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent" />

                {/* Info badge */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl">
                    <h3 className="text-xl font-display font-bold text-navy-900 dark:text-white">
                      Dr. Padma Sharma
                    </h3>
                    <p className="text-brand-600 dark:text-brand-400 font-medium">
                      Principal & Director
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Floating quote icon */}
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl shadow-xl flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <Quote className="w-10 h-10 text-white" />
              </motion.div>
            </div>

            {/* Achievement badges */}
            <motion.div
              className="flex gap-4 mt-8 justify-center lg:justify-start"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {achievements.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-navy-800 rounded-full shadow-lg border border-slate-100 dark:border-navy-700"
                  whileHover={{ scale: 1.05, y: -3 }}
                >
                  <item.icon className="w-4 h-4 text-brand-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            style={{ y, opacity }}
            className="relative"
          >
            {/* Section label */}
            <motion.div
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-[2px] bg-gradient-to-r from-brand-500 to-gold-500" />
              <span className="text-brand-600 dark:text-brand-400 font-bold text-sm uppercase tracking-widest">
                Principal's Message
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-navy-900 dark:text-white leading-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Nurturing Tomorrow's{' '}
              <span className="bg-gradient-to-r from-brand-500 via-brand-600 to-navy-700 dark:from-brand-400 dark:to-brand-300 bg-clip-text text-transparent">
                Leaders
              </span>
            </motion.h2>

            {/* Quote */}
            <motion.blockquote
              className="relative pl-6 border-l-4 border-brand-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 italic leading-relaxed font-serif">
                "Education is not just about academic excellence; it's about shaping character, building confidence, and inspiring curiosity. At Gurukul, we believe every child carries the potential to change the world."
              </p>
            </motion.blockquote>

            {/* Main content */}
            <motion.div
              className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <p>
                For over three decades, Gurukul International School has stood as a beacon of educational excellence, where tradition meets innovation. Our commitment extends beyond textbooks—we cultivate minds that question, hearts that care, and spirits that dare to dream.
              </p>
              <p>
                Our dedicated faculty, state-of-the-art facilities, and holistic curriculum create an environment where students don't just learn—they thrive. From the science laboratory to the sports field, from the arts studio to the community service initiatives, every experience at Gurukul is designed to shape well-rounded individuals ready to make their mark on the world.
              </p>
            </motion.div>

            {/* Signature */}
            <motion.div
              className="mt-10 pt-8 border-t border-slate-200 dark:border-navy-700"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <p className="font-serif text-2xl text-navy-900 dark:text-white italic">
                Dr. Padma Sharma
              </p>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Principal, Gurukul International School
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-navy-900 to-brand-700 dark:from-brand-500 dark:to-brand-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-brand-500/30 transition-all duration-300 group hover-target"
              >
                <span>Meet Our Leadership</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalsMessage;
