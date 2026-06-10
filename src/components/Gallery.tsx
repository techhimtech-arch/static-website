import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const images = [
    {
      title: "State-of-the-Art Labs",
      subtitle: "Fostering Innovation",
      src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80",
    },
    {
      title: "Extensive Library",
      subtitle: "A World of Knowledge",
      src: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80",
    },
    {
      title: "Sports Complex",
      subtitle: "Building Champions",
      src: "https://images.unsplash.com/photo-1518605368461-1ee71161d283?auto=format&fit=crop&q=80",
    },
    {
      title: "Creative Arts Studio",
      subtitle: "Unleash Imagination",
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80",
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
        scrub: 1,
        end: () => "+=" + (trackRef.current?.offsetWidth || 0) * 1.5, // Make scroll longer for smoother effect
      }
    });

    tl.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
    });

    // Add parallax effect to images inside the scrolling track
    imagesArray.forEach((img) => {
      gsap.to(img, {
        xPercent: 20, // Images move slightly right while container moves left
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (trackRef.current?.offsetWidth || 0) * 1.5,
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
      <div className="absolute top-12 left-12 z-20 mix-blend-difference text-white">
        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight">Our Infrastructure</h2>
        <p className="text-brand-400 mt-2 text-lg font-medium tracking-wide">Swipe through excellence</p>
      </div>

      <div ref={trackRef} className="h-full flex items-center pt-24 w-[400vw]">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="gallery-item w-screen h-full flex flex-col justify-center items-center px-12 md:px-32 relative"
          >
            <div className="w-full max-w-6xl aspect-video md:aspect-[21/9] relative overflow-hidden rounded-[2rem] group shadow-2xl hover-target cursor-none">
              {/* Image with scaling buffer for parallax (-10% to 10%) */}
              <div 
                className="parallax-image absolute top-0 -left-[10%] w-[120%] h-full bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${img.src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80" />
              
              <div className="absolute bottom-12 left-12 md:bottom-16 md:left-16 overflow-hidden">
                <p className="text-brand-400 font-bold mb-2 uppercase tracking-widest text-sm translate-y-full opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100 delay-100">{img.subtitle}</p>
                <h3 className="text-4xl md:text-6xl font-display font-black text-white translate-y-full opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">{img.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
