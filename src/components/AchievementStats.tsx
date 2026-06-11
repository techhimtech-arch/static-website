import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, Users, Building, GraduationCap, Award, Target, BookOpen, Globe, ArrowUpRight, Calendar } from 'lucide-react';

interface StatCard {
  id: number;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: typeof TrendingUp;
  color: string;
  bgGradient: string;
  increment?: string;
  trend?: 'up' | 'down' | 'stable';
  yearOverYear?: string;
}

const statsData: StatCard[] = [
  {
    id: 1,
    label: 'Students Enrolled',
    value: 2500,
    suffix: '+',
    icon: Users,
    color: 'text-brand-400',
    bgGradient: 'from-brand-500 to-cyan-500',
    increment: '+12%',
    trend: 'up',
    yearOverYear: 'vs last year',
  },
  {
    id: 2,
    label: 'Faculty Members',
    value: 150,
    suffix: '+',
    icon: GraduationCap,
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500 to-teal-500',
    increment: '+8',
    trend: 'up',
    yearOverYear: 'new joinees',
  },
  {
    id: 3,
    label: 'Classrooms',
    value: 55,
    suffix: '',
    icon: Building,
    color: 'text-gold-400',
    bgGradient: 'from-gold-500 to-amber-500',
    trend: 'stable',
  },
  {
    id: 4,
    label: 'Board Results',
    value: 100,
    suffix: '%',
    icon: Target,
    color: 'text-rose-400',
    bgGradient: 'from-rose-500 to-pink-500',
    trend: 'stable',
    yearOverYear: 'for 10 years',
  },
  {
    id: 5,
    label: 'National Awards',
    value: 150,
    suffix: '+',
    icon: Award,
    color: 'text-violet-400',
    bgGradient: 'from-violet-500 to-purple-500',
    increment: '+25',
    trend: 'up',
    yearOverYear: 'this year',
  },
  {
    id: 6,
    label: 'Books in Library',
    value: 50000,
    suffix: '+',
    icon: BookOpen,
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500 to-blue-500',
    increment: '+3000',
    trend: 'up',
    yearOverYear: 'new titles',
  },
];

const quickStats = [
  { label: 'Years of Excellence', value: '30+', icon: Calendar },
  { label: 'Alumni Network', value: '15,000+', icon: Users },
  { label: 'Countries Reached', value: '25+', icon: Globe },
];

const AnimatedNumber: React.FC<{ value: number; suffix: string; prefix?: string }> = ({ value, suffix, prefix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2500;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (value - startValue) * easeOutQuart);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display font-black text-5xl md:text-6xl">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const StatCard: React.FC<{ stat: StatCard; index: number }> = ({ stat, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Animated glow border */}
      <motion.div
        className={`absolute -inset-0.5 bg-gradient-to-r ${stat.bgGradient} rounded-3xl opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-700`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% 200%' }}
      />

      <div className="relative bg-white dark:bg-navy-800/80 backdrop-blur-xl rounded-[1.4rem] p-6 border border-slate-100 dark:border-navy-700 overflow-hidden group-hover:border-transparent transition-colors duration-500">
        {/* Background decoration */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${stat.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-bl-full`} />

        {/* Trend indicator */}
        {stat.trend === 'up' && (
          <motion.div
            className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <ArrowUpRight className="w-3 h-3" />
            {stat.increment}
          </motion.div>
        )}

        {/* Icon */}
        <motion.div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bgGradient} flex items-center justify-center mb-4 shadow-lg`}
          style={{ transform: "translateZ(20px)" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <stat.icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Value */}
        <div className="mb-2" style={{ transform: "translateZ(15px)" }}>
          <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
        </div>

        {/* Label */}
        <p
          className="text-slate-600 dark:text-slate-300 font-medium"
          style={{ transform: "translateZ(10px)" }}
        >
          {stat.label}
        </p>

        {/* Year-over-year info */}
        {stat.yearOverYear && (
          <p className="text-slate-400 text-xs mt-2" style={{ transform: "translateZ(5px)" }}>
            {stat.yearOverYear}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const AchievementStats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-cream-50 via-white to-cream-50 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950 overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(14,165,233,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
            <span className="text-brand-600 dark:text-brand-400 font-bold text-sm uppercase tracking-widest">
              Numbers That Speak
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-navy-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Achievement Dashboard
          </motion.h2>
          <motion.p
            className="text-slate-500 dark:text-slate-400 text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Three decades of excellence, reflected in our numbers. See why we're ranked among India's top schools.
          </motion.p>
        </div>

        {/* Quick Stats Bar */}
        <motion.div
          className="flex flex-wrap justify-center gap-8 mb-20 p-8 bg-white/50 dark:bg-navy-800/30 backdrop-blur-xl rounded-3xl border border-slate-100 dark:border-navy-700"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {quickStats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-gold-100 dark:from-brand-900/30 dark:to-gold-900/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-navy-900 dark:text-white">{stat.value}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-[1000px]">
          {statsData.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#achievements"
            className="inline-flex items-center gap-3 text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
            whileHover={{ x: 5 }}
          >
            <Award className="w-5 h-5" />
            <span>View All Achievements</span>
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementStats;
