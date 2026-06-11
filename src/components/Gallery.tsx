import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const images = [
    {
      title: "State-of-the-Art Labs",
      subtitle: "Fostering Innovation",
      desc: "World-class laboratories equipped with cutting-edge technology",
      src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80",
      color: "from-brand-500",
    },
    {
      title: "Extensive Library",
      subtitle: "A World of Knowledge",
      desc: "Over 50,000 books and digital resources for curious minds",
      src: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80",
      color: "from-amber-500",
    },
    {
      title: "Sports Complex",
      subtitle: "Building Champions",
      desc: "Olympic-standard facilities for every athletic pursuit",
      src: "https://images.unsplash.com/photo-1518605368461-1ee71161d283?auto=format&fit=crop&q=80",
      color: "from-emerald-500",
    },
    {
      title: "Creative Arts Studio",
      subtitle: "Unleash Imagination",
      desc: "Dedicated spaces for music, drama, and visual arts",
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80",
      color: "from-rose-500",
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const sections = gsap.utils.toArray('.gallery-item') as HTMLElement[];
    const imagesArray = gsap.utils.toArray('.parallax-image') as HTMLElement[];

    // Create horizontal scrolling timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.2,
        end: () => "+=" + (trackRef.current?.offsetWidth || 0) * 1.8,
      }
    });

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
    });

    // Add parallax effect to images
    imagesArray.forEach((img) => {
      gsap.to(img, {
        xPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.2,
          start: "top top",
          end: () => "+=" + (trackRef.current?.offsetWidth || 0) * 1.8,
        }
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative w-full h-screen bg-slate-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Title Header */}
      <motion.div
        className="absolute top-12 left-12 z-20"
        style={{ opacity }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-display font-black text-white tracking-tight"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Infrastructure
        </motion.h2>
        <motion.div
          className="flex items-center gap-3 mt-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="w-8 h-[2px] bg-gradient-to-r from-brand-500 to-transparent"
            animate={{ scaleX: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-brand-400 text-lg font-medium tracking-wide">Explore Our Campus</p>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-12 left-12 z-20 flex items-end gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="flex gap-2">
          {images.map((_, i) => (
            <motion.div
              key={i}
              className="w-12 h-1 rounded-full bg-white/20 overflow-hidden"
              whileHover={{ scale: 1.2 }}
            >
              <motion.div
                className="h-full bg-brand-400 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-12 right-12 z-20 flex items-center gap-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.p
          className="text-slate-400 text-sm uppercase tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.p>
        <motion.div
          className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.span className="text-slate-400 text-xs">→</motion.span>
        </motion.div>
      </motion.div>

      {/* Gallery Track */}
      <div ref={trackRef} className="h-full flex items-center pt-24 w-[400vw]">
        {images.map((img, index) => (
          <div
            key={index}
            className="gallery-item w-screen h-full flex flex-col justify-center items-center px-8 md:px-24 relative"
          >
            <motion.div
              className="w-full max-w-7xl aspect-video md:aspect-[21/9] relative overflow-hidden rounded-[2.5rem] group shadow-2xl hover-target cursor-none"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated border glow */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${img.color} via-transparent to-transparent rounded-[2.7rem] opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-700`}
              />

              {/* Image with parallax */}
              <motion.div
                className="parallax-image absolute top-0 -left-[10%] w-[120%] h-full bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${img.src})` }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-slate-950/50 opacity-60" />

              {/* Decorative elements */}
              <motion.div
                className="absolute top-8 right-8 w-20 h-20 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute top-12 right-12 w-12 h-12 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Content */}
              <div className="absolute bottom-12 left-12 md:bottom-16 md:left-16 right-12 md:right-16">
                <motion.div
                  className="overflow-hidden mb-2"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.p
                    className={`text-sm font-bold mb-3 uppercase tracking-widest bg-gradient-to-r ${img.color} bg-clip-text text-transparent`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {img.subtitle}
                  </motion.p>
                </motion.div>

                <motion.h3
                  className="text-4xl md:text-7xl font-display font-black text-white mb-4"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {img.title}
                </motion.h3>

                <motion.p
                  className="text-slate-400 text-lg md:text-xl max-w-lg"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {img.desc}
                </motion.p>

                {/* Interactive CTA */}
                <motion.div
                  className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                >
                  <button className="flex items-center gap-4 text-white group/btn">
                    <motion.span
                      className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover/btn:border-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.span>
                    <span className="text-sm uppercase tracking-widest">Explore</span>
                  </button>
                </motion.div>
              </div>

              {/* Counter */}
              <motion.div
                className="absolute top-8 left-8 text-white/40 font-display font-bold text-6xl md:text-8xl select-none"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
