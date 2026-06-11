import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, MapPin, ChevronLeft, ChevronRight, X, Volume2, VolumeX, Maximize } from 'lucide-react';

interface TourSpot {
  id: number;
  name: string;
  description: string;
  image: string;
  videoUrl?: string;
  features: string[];
  timings?: string;
}

const tourSpots: TourSpot[] = [
  {
    id: 1,
    name: 'Main Building',
    description: 'The heart of our campus featuring administrative offices, smart classrooms, and the central library.',
    image: 'https://images.unsplash.com/photo-1562774053-701945374c15?auto=format&fit=crop&q=80&w=1200',
    features: ['Smart Classrooms', 'Central AC', 'CCTV Security', 'Digital Library'],
    timings: '8:00 AM - 4:00 PM',
  },
  {
    id: 2,
    name: 'Science Laboratories',
    description: 'State-of-the-art labs for Physics, Chemistry, Biology, and Computer Science with modern equipment.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200',
    features: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Computer Lab'],
    timings: '9:00 AM - 3:30 PM',
  },
  {
    id: 3,
    name: 'Sports Complex',
    description: 'Olympic-standard facilities including indoor and outdoor courts, gymnasium, and swimming pool.',
    image: 'https://images.unsplash.com/photo-1518605368461-1ee71161d283?auto=format&fit=crop&q=80&w=1200',
    features: ['Football Ground', 'Basketball Court', 'Swimming Pool', 'Indoor Stadium'],
    timings: '6:00 AM - 7:00 PM',
  },
  {
    id: 4,
    name: 'Library & Resource Center',
    description: 'A knowledge hub with over 50,000 books, digital resources, and quiet study spaces.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200',
    features: ['50,000+ Books', 'Digital Library', 'Reading Rooms', 'Research Section'],
    timings: '7:30 AM - 5:00 PM',
  },
  {
    id: 5,
    name: 'Arts & Music Block',
    description: 'Creative spaces for visual arts, music, dance, and drama with professional-grade facilities.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200',
    features: ['Art Studios', 'Music Rooms', 'Dance Studio', 'Theater'],
    timings: '8:00 AM - 4:30 PM',
  },
  {
    id: 6,
    name: 'Cafeteria',
    description: 'Hygienic and spacious dining area serving nutritious meals prepared in-house.',
    image: 'https://images.unsplash.com/photo-1544028168-21cfd9f4c5de?auto=format&fit=crop&q=80&w=1200',
    features: ['200+ Seating', 'Hygienic Kitchen', 'Nutritious Meals', 'Veg & Non-Veg'],
    timings: '8:00 AM - 4:00 PM',
  },
];

const VirtualCampusTour: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSpot, setActiveSpot] = useState<TourSpot | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % tourSpots.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + tourSpots.length) % tourSpots.length);
  };

  return (
    <section ref={sectionRef} id="campus-tour" className="relative py-32 bg-gradient-to-b from-navy-950 to-navy-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'radial-gradient(circle at 50% 100%, rgba(14,165,233,0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <MapPin className="w-6 h-6 text-brand-400" />
            <span className="text-brand-400 font-bold text-sm uppercase tracking-widest">
              Explore Our Campus
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Virtual Campus Tour
          </motion.h2>
          <motion.p
            className="text-slate-400 text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Take a virtual walkthrough of our world-class facilities. Experience the environment where futures are shaped.
          </motion.p>
        </div>

        {/* Main Tour Viewer */}
        <div className="relative mb-16">
          {/* Main Image/Video Container */}
          <motion.div
            className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
            onClick={() => setActiveSpot(tourSpots[currentSlide])}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <motion.img
              key={currentSlide}
              src={tourSpots[currentSlide].image}
              alt={tourSpots[currentSlide].name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-navy-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950via-navy-950/50 to-transparent opacity-80" />

            {/* Play button overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30"
                whileHover={{ scale: 1.1 }}
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.div>
            </motion.div>

            {/* Controls */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              {/* Current location info */}
              <div className="text-white">
                <motion.p
                  key={`title-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl md:text-3xl font-display font-bold mb-1"
                >
                  {tourSpots[currentSlide].name}
                </motion.p>
                <motion.p
                  key={`desc-${currentSlide}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-300 text-sm max-w-lg hidden md:block"
                >
                  {tourSpots[currentSlide].description}
                </motion.p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                <motion.button
                  onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-2">
              {tourSpots.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                  className={`transition-all duration-300 ${
                    i === currentSlide
                      ? 'w-8 h-2 bg-white rounded-full'
                      : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                  }`}
                  whileHover={{ scale: i === currentSlide ? 1 : 1.3 }}
                />
              ))}
            </div>

            {/* Side controls */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <motion.button
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Maximize className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Counter */}
            <div className="absolute top-6 left-6">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-white text-sm font-medium border border-white/20">
                <span className="text-brand-400 font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-slate-300">{String(tourSpots.length).padStart(2, '0')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Navigation Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {tourSpots.map((spot, i) => (
            <motion.button
              key={spot.id}
              onClick={() => { setCurrentSlide(i); setActiveSpot(spot); }}
              className={`relative aspect-video rounded-2xl overflow-hidden group ${
                i === currentSlide ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-navy-900' : ''
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-left">
                <p className="text-white text-xs font-medium truncate">{spot.name}</p>
              </div>
              {i === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-brand-500/20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Book Tour CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-400 mb-6">
            Want to see it in person? Schedule a campus visit today.
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-brand-500/30 transition-all duration-300 hover-target"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MapPin className="w-5 h-5" />
            <span>Schedule Campus Visit</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {activeSpot && (
          <motion.div
            className="fixed inset-0 z-[99999] bg-navy-950/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSpot(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                onClick={() => setActiveSpot(null)}
                whileHover={{ scale: 1.1 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Main content */}
              <div className="bg-navy-900 rounded-3xl overflow-hidden shadow-2xl">
                {/* Image */}
                <div className="relative aspect-video">
                  <img
                    src={activeSpot.image}
                    alt={activeSpot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
                </div>

                {/* Details */}
                <div className="p-8">
                  <h3 className="text-3xl font-display font-bold text-white mb-2">
                    {activeSpot.name}
                  </h3>
                  <p className="text-slate-400 mb-6">{activeSpot.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-3">
                      Key Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeSpot.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-brand-500/10 text-brand-400 rounded-full text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timings */}
                  {activeSpot.timings && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="text-sm font-medium">Operating Hours:</span>
                      <span className="text-sm">{activeSpot.timings}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VirtualCampusTour;
