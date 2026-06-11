import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Trophy, Medal, Star, Award, BookOpen, TrendingUp, ChevronRight } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  student: string;
  category: string;
  year: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  image?: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'JEE Advanced Top 100 Rank',
    student: 'Arjun Mehta',
    category: 'Academics',
    year: '2024',
    description: 'Secured AIR 47 in JEE Advanced, showcasing exceptional aptitude in Physics and Mathematics.',
    icon: Trophy,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 2,
    title: 'CBSE National Science Exhibition Winner',
    student: 'Team Innovation',
    category: 'Science',
    year: '2024',
    description: 'Developed an AI-powered waste segregation system, winning at the national level.',
    icon: Medal,
    color: 'from-brand-500 to-cyan-500',
  },
  {
    id: 3,
    title: 'International Math Olympiad Gold',
    student: 'Priya Sharma',
    category: 'Mathematics',
    year: '2023',
    description: 'Gold medalist at IMO, representing India at the international stage.',
    icon: Medal,
    color: 'from-gold-500 to-yellow-500',
  },
  {
    id: 4,
    title: 'CBSE Football Championship',
    student: 'School Team',
    category: 'Sports',
    year: '2024',
    description: 'Won the CBSE National Football Championship for the third consecutive year.',
    icon: Trophy,
    color: 'from-emerald-500 to-teal-500',
  },
];

const achievementStats = [
  { icon: Award, value: '150+', label: 'National Awards', color: 'text-brand-500' },
  { icon: Star, value: '50+', label: 'International Wins', color: 'text-gold-500' },
  { icon: BookOpen, value: '100%', label: 'Board Results', color: 'text-emerald-500' },
  { icon: TrendingUp, value: '98%', label: 'IIT Selection', color: 'text-rose-500' },
];

const StudentAchievements: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const categories = ['All', 'Academics', 'Sports', 'Science', 'Arts'];

  const filteredAchievements = activeCategory === 'All'
    ? achievements
    : achievements.filter(a => a.category === activeCategory);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.03)_0%,transparent_50%)]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            <Trophy className="w-6 h-6 text-gold-500" />
            <span className="text-gold-400 font-bold text-sm uppercase tracking-widest">
              Excellence in Action
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Student Achievements
          </motion.h2>
          <motion.p
            className="text-slate-400 text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Celebrating excellence across academics, sports, and extracurriculars. Our students consistently set new benchmarks.
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {achievementStats.map((stat, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 text-center">
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 border border-navy-700 flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </motion.div>
                <motion.p
                  className="text-4xl font-display font-black text-white mb-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30'
                  : 'bg-navy-800/50 text-slate-400 hover:text-white hover:bg-navy-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative"
              >
                {/* Animated glow */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${achievement.color} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                />

                <div className="relative bg-navy-800/50 backdrop-blur-2xl border border-navy-700/50 rounded-[2rem] p-8 overflow-hidden group-hover:border-brand-500/30 transition-all duration-500">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-gold-500/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <achievement.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <span className="px-4 py-1.5 bg-brand-500/10 text-brand-400 rounded-full text-sm font-bold">
                        {achievement.year}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-slate-400 mb-4 text-sm">
                      {achievement.student}
                    </p>
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {achievement.description}
                    </p>

                    {/* Category badge & CTA */}
                    <div className="flex items-center justify-between">
                      <span className="px-4 py-2 bg-navy-700/50 text-slate-300 rounded-full text-xs font-medium uppercase tracking-wider">
                        {achievement.category}
                      </span>
                      <motion.button
                        className="flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-medium">Read More</span>
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 rounded-full font-bold text-lg shadow-xl shadow-gold-500/30 hover:shadow-2xl hover:shadow-gold-500/40 transition-all duration-300 hover-target"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Trophy className="w-5 h-5" />
            <span>View All Achievements</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentAchievements;
