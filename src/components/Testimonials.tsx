import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Parent of Grade 8 Student",
    content: "The environment here is simply incredible. My daughter has transformed from a shy girl into a confident public speaker and athlete. The teachers truly care.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Dr. Arun Patel",
    role: "Alumnus (Batch of 2012)",
    content: "The foundation I received at Himtech was instrumental in my medical career. The emphasis on practical labs and independent thinking is unmatched.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Elena Rodriguez",
    role: "Parent of Grade 5 Student",
    content: "We moved across the country just to enroll our son here. The integration of technology and arts in their daily curriculum is exactly what the future demands.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Michael Chang",
    role: "Current Grade 12 Student",
    content: "From the robotics lab to the debate club, I've had the freedom to explore all my passions. I feel completely prepared for university life.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

const Testimonials: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-32 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-100 dark:bg-brand-900/30 rounded-full mix-blend-multiply blur-[80px] opacity-60 -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">Voices of Excellence</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">Hear from our community of parents, students, and alumni who make our school extraordinary.</p>
          </div>
          <div className="text-slate-400 text-sm tracking-widest uppercase font-bold flex items-center gap-2">
            <span className="w-8 h-[2px] bg-brand-500 inline-block"></span>
            Drag to explore
          </div>
        </div>
      </div>

      <div className="pl-6 md:pl-12 lg:pl-24" ref={carouselRef}>
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -width - 40 }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-8 cursor-grab"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="min-w-[320px] md:min-w-[450px] p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none flex-shrink-0 relative group"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Quote className="absolute top-10 right-10 w-12 h-12 text-brand-500/10 dark:text-brand-400/10 group-hover:text-brand-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-400 text-brand-400" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 font-medium mb-10 leading-relaxed">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover shadow-md" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">{testimonial.name}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
