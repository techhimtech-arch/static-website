import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleCheck as CheckCircle, FileText, Users, BookOpen, Award, CalendarCheck, ClipboardCheck, ArrowRight, Download, Phone } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: typeof FileText;
  duration: string;
  details: string[];
  documents?: string[];
}

const admissionSteps: Step[] = [
  {
    id: 1,
    title: 'Online Registration',
    description: 'Begin your journey by completing the online application form',
    icon: FileText,
    duration: '5-10 minutes',
    details: [
      'Fill out the application form online',
      'Upload required documents',
      'Pay the application fee online',
      'Receive application number',
    ],
    documents: ['Student Photo', 'Birth Certificate', 'Aadhaar Card'],
  },
  {
    id: 2,
    title: 'Document Verification',
    description: 'Our team verifies all submitted documents',
    icon: ClipboardCheck,
    duration: '3-5 working days',
    details: [
      'Academic records verification',
      'Address proof validation',
      'Category certificate check',
      'Previous school records review',
    ],
    documents: ['Mark Sheets', 'Transfer Certificate', 'Report Cards'],
  },
  {
    id: 3,
    title: 'Entrance Assessment',
    description: 'Students appear for age-appropriate assessment',
    icon: BookOpen,
    duration: '1-2 hours',
    details: [
      'Written assessment for classes III-X',
      'Interaction session for Pre-Nursery to II',
      'Assessment of aptitude & academics',
      'Creative & analytical thinking evaluation',
    ],
  },
  {
    id: 4,
    title: 'Personal Interaction',
    description: 'Meet with our admission committee',
    icon: Users,
    duration: '30-45 minutes',
    details: [
      'Student interaction with educators',
      'Parent interaction with principal',
      'Discussion of student interests',
      'Tour of school facilities',
    ],
  },
  {
    id: 5,
    title: 'Selection & Admission',
    description: 'Receive offer and complete admission formalities',
    icon: Award,
    duration: '1-2 weeks',
    details: [
      'Selection list announcement',
      'Admission offer letter',
      'Fee payment & documentation',
      'Uniform & materials distribution',
    ],
  },
  {
    id: 6,
    title: 'Welcome to Gurukul',
    description: 'Begin your exciting educational journey',
    icon: CalendarCheck,
    duration: 'Orientation Day',
    details: [
      'Orientation program for new students',
      'Introduction to faculty & peers',
      'Classroom allotment',
      'Academic year begins',
    ],
  },
];

const AdmissionProcess: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const completedStep = 3;

  return (
    <section ref={sectionRef} id="admissions" className="relative py-32 bg-gradient-to-b from-white to-cream-50 dark:from-navy-950 dark:to-navy-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-[2px] bg-gradient-to-r from-brand-500 to-gold-500" />
            <span className="text-brand-600 dark:text-brand-400 font-bold text-sm uppercase tracking-widest">
              Join Our Family
            </span>
            <div className="w-12 h-[2px] bg-gradient-to-r from-gold-500 to-brand-500" />
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-display font-black text-navy-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Admission Process
          </motion.h2>
          <motion.p
            className="text-slate-500 dark:text-slate-400 text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Simple, transparent, and supportive. We're here to guide you through every step of your admission journey.
          </motion.p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 via-gold-500 to-brand-500 hidden lg:block -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {admissionSteps.map((step, index) => {
              const isCompleted = index < completedStep;
              const isCurrent = index === completedStep;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  className={`relative lg:flex lg:items-center ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-1/2 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <motion.div
                      className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-500 ${
                        activeStep === step.id || isCompleted
                          ? 'bg-gradient-to-br from-brand-50 to-gold-50 dark:from-brand-900/30 dark:to-gold-900/20 shadow-xl border border-brand-200 dark:border-brand-800'
                          : 'bg-white dark:bg-navy-800/50 shadow-lg border border-slate-100 dark:border-navy-700 hover:border-brand-300 dark:hover:border-brand-600'
                      }`}
                      onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Step number badge */}
                      <div className={`absolute -top-4 ${isLeft ? 'right-8' : 'left-8'} lg:right-auto lg:left-auto ${isLeft ? 'lg:-right-4' : 'lg:-left-4'}`}>
                        <motion.div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            isCompleted
                              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-gradient-to-br from-brand-500 to-brand-600 text-white'
                              : 'bg-navy-100 dark:bg-navy-700 text-navy-600 dark:text-slate-300'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <span className="text-lg font-display font-black">{step.id}</span>
                          )}
                        </motion.div>
                      </div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-brand-100 to-gold-100 dark:from-brand-800/50 dark:to-gold-800/30 flex items-center justify-center`}>
                          <step.icon className={`w-7 h-7 ${isCompleted ? 'text-emerald-500' : 'text-brand-500'}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-display font-bold text-navy-900 dark:text-white mb-1">
                            {step.title}
                          </h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {step.duration}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {step.description}
                      </p>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {(activeStep === step.id || isCompleted) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-slate-200 dark:border-navy-600 space-y-3">
                              {step.details.map((detail, i) => (
                                <motion.div
                                  key={i}
                                  className="flex items-center gap-3"
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-emerald-500' : 'text-brand-400'}`} />
                                  <span className="text-sm text-slate-600 dark:text-slate-300">{detail}</span>
                                </motion.div>
                              ))}

                              {step.documents && (
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-navy-700">
                                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                    Required Documents
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.documents.map((doc, i) => (
                                      <span
                                        key={i}
                                        className="px-3 py-1 text-xs bg-white dark:bg-navy-700 rounded-full text-slate-600 dark:text-slate-300"
                                      >
                                        {doc}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand indicator */}
                      <motion.div
                        className="absolute bottom-4 right-4"
                        animate={{ rotate: activeStep === step.id ? 180 : 0 }}
                      >
                        <ArrowRight className="w-5 h-5 text-brand-400 rotate-90" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex items-center justify-center w-16 relative z-10">
                    <motion.div
                      className={`w-8 h-8 rounded-full border-4 ${
                        isCompleted
                          ? 'bg-emerald-500 border-emerald-300'
                          : isCurrent
                          ? 'bg-brand-500 border-brand-300 animate-pulse'
                          : 'bg-navy-300 dark:bg-navy-700 border-navy-200 dark:border-navy-600'
                      }`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    />
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto p-10 bg-gradient-to-r from-navy-900 via-brand-900 to-navy-900 dark:from-brand-950 dark:via-brand-900 dark:to-brand-950 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <motion.div
                className="inline-block px-4 py-2 bg-gold-500 text-navy-900 rounded-full text-sm font-bold mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Admissions Open for 2026-27
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-4">
                Begin Your Child's Journey Today
              </h3>
              <p className="text-slate-300 mb-8">
                Limited seats available. Apply now to secure your child's place at Gurukul International School.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl shadow-gold-500/30 transition-all duration-300 hover-target"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="#"
                  className="inline-flex items-center gap-3 px-8 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Brochure</span>
                </motion.a>

                <motion.a
                  href="tel:+918629820098"
                  className="inline-flex items-center gap-3 px-8 py-5 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Us</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionProcess;
