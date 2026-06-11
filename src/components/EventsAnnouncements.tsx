import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronRight, ArrowRight, Bell, Star } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'academic' | 'sports' | 'cultural' | 'important';
  description: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Annual Day Celebration 2026',
    date: '2026-02-15',
    time: '5:00 PM - 9:00 PM',
    location: 'School Auditorium',
    category: 'cultural',
    description: 'A grand celebration showcasing student talents in music, dance, and drama.',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'CBSE Board Examinations Begin',
    date: '2026-03-01',
    time: '9:00 AM',
    location: 'Examination Hall',
    category: 'academic',
    description: 'Class 10th and 12th board examinations commence.',
    isNew: true,
  },
  {
    id: 3,
    title: 'Inter-School Football Tournament',
    date: '2026-01-25',
    time: '8:00 AM - 4:00 PM',
    location: 'Sports Complex',
    category: 'sports',
    description: 'Annual football championship with participation from 20 schools.',
  },
  {
    id: 4,
    title: 'Parent-Teacher Meeting',
    date: '2026-01-20',
    time: '9:00 AM - 1:00 PM',
    location: 'Respective Classrooms',
    category: 'important',
    description: 'Discussion of student progress and academic performance.',
    isNew: true,
  },
  {
    id: 5,
    title: 'Science Exhibition',
    date: '2026-02-28',
    time: '10:00 AM - 5:00 PM',
    location: 'Science Block',
    category: 'academic',
    description: 'Showcasing innovative projects by students from classes 6-12.',
  },
  {
    id: 6,
    title: 'Alumni Homecoming',
    date: '2026-03-15',
    time: '4:00 PM onwards',
    location: 'School Campus',
    category: 'cultural',
    description: 'Reunion event for batches 2000-2020.',
    isFeatured: true,
  },
];

const categoryColors = {
  academic: 'from-brand-500 to-cyan-500',
  sports: 'from-emerald-500 to-teal-500',
  cultural: 'from-rose-500 to-pink-500',
  important: 'from-amber-500 to-orange-500',
};

const categoryBg = {
  academic: 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400',
  sports: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  cultural: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
  important: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
};

const EventsAnnouncements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'featured'>('all');
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredEvents = events.filter(event => {
    if (activeTab === 'featured') return event.isFeatured;
    if (activeTab === 'upcoming') return true;
    return true;
  });

  const featuredEvent = events.find(e => e.isFeatured);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
    };
  };

  return (
    <section ref={sectionRef} id="events" className="relative py-32 bg-gradient-to-b from-navy-900 to-navy-950 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <Bell className="w-6 h-6 text-gold-500" />
            <span className="text-gold-400 font-bold text-sm uppercase tracking-widest">
              Stay Updated
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-display font-black text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Events & Announcements
          </motion.h2>
          <motion.p
            className="text-slate-400 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Stay connected with our vibrant school community through upcoming events and latest news.
          </motion.p>
        </div>

        {/* Featured Event */}
        {featuredEvent && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden group">
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[featuredEvent.category]} opacity-10`} />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/80" />

              {/* Decorative elements */}
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(circle, rgba(234,179,8,0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                {/* Date box */}
                <motion.div
                  className="flex-shrink-0 w-28 h-28 bg-white/10 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center border border-white/10"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <span className="text-4xl font-display font-black text-white">
                    {formatDate(featuredEvent.date).day}
                  </span>
                  <span className="text-gold-400 font-bold text-sm uppercase">
                    {formatDate(featuredEvent.date).month}
                  </span>
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                    <span className="px-3 py-1 bg-gold-500 text-navy-900 rounded-full text-xs font-bold uppercase">
                      Featured
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryBg[featuredEvent.category]}`}>
                      {featuredEvent.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-slate-300 mb-4 max-w-xl">{featuredEvent.description}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-400" />
                      {featuredEvent.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-400" />
                      {featuredEvent.location}
                    </span>
                  </div>
                </div>

                {/* Action */}
                <motion.button
                  className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:shadow-brand-500/30 transition-all duration-300 hover-target"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Tabs */}
        <motion.div
          className="flex justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          {[
            { id: 'all', label: 'All Events' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'featured', label: 'Featured' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-navy-900 shadow-lg'
                  : 'bg-navy-800/50 text-slate-400 hover:text-white hover:bg-navy-700/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.filter(e => !e.isFeatured).map((event, i) => {
              const date = formatDate(event.date);
              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative"
                >
                  <div className="relative bg-navy-800/50 backdrop-blur-xl rounded-2xl p-6 border border-navy-700/50 overflow-hidden hover:border-brand-500/30 transition-all duration-300">
                    {/* Hover gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[event.category]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    {/* New badge */}
                    {event.isNew && (
                      <motion.div
                        className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-rose-500 text-white rounded-full text-xs font-bold"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="w-3 h-3" />
                        New
                      </motion.div>
                    )}

                    <div className="relative z-10">
                      {/* Date */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-navy-700/50 rounded-xl flex flex-col items-center justify-center">
                          <span className="text-xl font-display font-bold text-white">{date.day}</span>
                          <span className="text-xs text-slate-400 uppercase">{date.month}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryBg[event.category]}`}>
                          {event.category}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-brand-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                      {/* Meta */}
                      <div className="space-y-2 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-brand-400" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {/* Action */}
                      <motion.button
                        className="flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-medium group/btn"
                        whileHover={{ x: 5 }}
                      >
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-brand-400 hover:text-white font-medium transition-colors"
            whileHover={{ x: 5 }}
          >
            <Calendar className="w-5 h-5" />
            <span>View Full Calendar</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsAnnouncements;
