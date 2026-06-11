import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Users, Star, ArrowRight } from 'lucide-react';

interface FacultyMember {
  name: string;
  role: string;
  qualification: string;
  experience: string;
  specialization: string;
  image: string;
  awards: number;
}

const faculty: FacultyMember[] = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Head of Science Department',
    qualification: 'Ph.D. (Physics), IIT Delhi',
    experience: '25+ Years',
    specialization: 'Quantum Physics & Nuclear Science',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    awards: 8,
  },
  {
    name: 'Mrs. Sunita Verma',
    role: 'Head of Mathematics',
    qualification: 'M.Sc., M.Phil (Mathematics)',
    experience: '20+ Years',
    specialization: 'Applied Mathematics & Statistics',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
    awards: 5,
  },
  {
    name: 'Dr. Anil Sharma',
    role: 'Head of English Department',
    qualification: 'Ph.D. (English Literature)',
    experience: '22+ Years',
    specialization: 'Modern Literature & Creative Writing',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300',
    awards: 6,
  },
  {
    name: 'Ms. Priya Kapoor',
    role: 'Head of Computer Science',
    qualification: 'M.Tech (Computer Science)',
    experience: '15+ Years',
    specialization: 'AI, Machine Learning & Robotics',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    awards: 4,
  },
];

const FacultyCard: React.FC<{ member: FacultyMember; index: number }> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 via-gold-500 to-brand-500 rounded-3xl opacity-0 group-hover:opacity-75 blur-sm transition-opacity duration-500"
        style={{ backgroundSize: '200% 200%' }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 200%'],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative bg-white dark:bg-navy-800 rounded-[1.4rem] p-6 overflow-hidden border border-slate-100 dark:border-navy-700">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-gold-50 dark:from-brand-900/10 dark:via-transparent dark:to-gold-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Image & Info */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              className="relative"
              style={{ transform: "translateZ(30px)" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-navy-700">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Award badge */}
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-xs font-bold">{member.awards}</span>
              </motion.div>
            </motion.div>

            <div className="flex-1" style={{ transform: "translateZ(20px)" }}>
              <h3 className="text-xl font-display font-bold text-navy-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-brand-600 dark:text-brand-400 font-medium text-sm mb-2">
                {member.role}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{member.qualification}</span>
              </div>
            </div>
          </div>

          {/* Experience & Specialization */}
          <div className="space-y-3 mb-6" style={{ transform: "translateZ(15px)" }}>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                <Award className="w-4 h-4 text-brand-500" />
              </div>
              <span className="text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-navy-800 dark:text-white">{member.experience}</span> Experience
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-lg bg-gold-50 dark:bg-gold-900/30 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-gold-600" />
              </div>
              <span className="text-slate-600 dark:text-slate-300">{member.specialization}</span>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-navy-700" style={{ transform: "translateZ(10px)" }}>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-gold-400 fill-gold-400"
                />
              ))}
            </div>
            <motion.button
              className="flex items-center gap-2 text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 text-sm font-medium"
              whileHover={{ x: 5 }}
            >
              <span>View Profile</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FacultyExcellence: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { value: '150+', label: 'Faculty Members', icon: Users },
    { value: '30+', label: 'Ph.D. Holders', icon: GraduationCap },
    { value: '85%', label: 'PG Qualified', icon: BookOpen },
    { value: '20+', label: 'Avg Experience (Years)', icon: Award },
  ];

  return (
    <section ref={sectionRef} id="faculty" className="relative py-32 bg-gradient-to-b from-slate-50 to-white dark:from-navy-900 dark:to-navy-950 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <Users className="w-6 h-6 text-brand-500" />
            <span className="text-brand-600 dark:text-brand-400 font-bold text-sm uppercase tracking-widest">
              Our Educators
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-navy-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Faculty Excellence
          </motion.h2>
          <motion.p
            className="text-slate-500 dark:text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our distinguished faculty brings together decades of experience, advanced degrees, and a passion for nurturing young minds.
          </motion.p>
        </div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 p-8 bg-white dark:bg-navy-800/50 rounded-3xl shadow-xl border border-slate-100 dark:border-navy-700"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-8 h-8 text-brand-500 mx-auto mb-3" />
              <p className="text-3xl md:text-4xl font-display font-black text-navy-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-[1000px]">
          {faculty.map((member, i) => (
            <FacultyCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-navy-900 dark:bg-brand-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover-target"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="w-5 h-5" />
            <span>Meet All Faculty Members</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultyExcellence;
