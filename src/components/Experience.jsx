import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experiences } from '../data/experience';



const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const Experience = () => {
  return (
    <section id="experience" className="relative z-10 py-12 md:py-16 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          variants={stagger}
        >
          <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
              <Briefcase className="text-blue-400" size={30} />
            </div>
            <motion.h2
              variants={fadeLeft}
              className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 py-2 leading-normal"
            >
              Experience
            </motion.h2>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-5 md:left-8 bottom-0 w-px bg-gradient-to-b from-blue-500/60 via-purple-500/40 to-transparent" />

            <div className="space-y-6 md:space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={fadeLeft}
                  className="relative flex gap-4 sm:gap-6 md:gap-10 group"
                >
                  <div className="shrink-0 w-10 sm:w-14 md:w-16 flex flex-col items-center pt-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.7)] transition-shadow duration-300 ring-2 ring-white/10 z-10">
                      <Briefcase size={16} className="text-white" />
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex-1 p-6 sm:p-7 md:p-8 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-white/15 hover:border-purple-400/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] ring-1 ring-white/5 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-500"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-gray-400">
                      <span className="font-semibold text-purple-300">{exp.company}</span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <MapPin size={13} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {exp.description.map((point, i) => (
                        <li key={i} className="flex gap-3 text-gray-400 text-base leading-relaxed">
                          <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-purple-500/80" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300 group-hover:text-purple-300 group-hover:border-purple-400/30 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
