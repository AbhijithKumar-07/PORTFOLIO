import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Database, Wrench, Brain, Users } from 'lucide-react';
import { skillCategories as skillData } from '../data/skills';

// Restored to the previous preferred icons
const iconMap = {
  "Languages": Code2,
  "Web Technologies": Globe,
  "Database & Cloud": Database,
  "Database & Infrastructure": Database,
  "Developer Tools": Wrench,
  "Tools & Concepts": Wrench,
  "Areas of Interest": Brain,
  "AI & Machine Learning": Brain,
  "Soft Skills": Users,
};

const skillCategories = skillData.map(cat => ({
  ...cat,
  icon: iconMap[cat.title] || Code2
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.35, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Fast, perfectly synchronized one-by-one sequential chip appearance
const chipContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035, // Very quick, distinct sequential reveal
      delayChildren: 0.12     // Starts right as the card settles
    }
  }
};

const chipPop = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="relative z-10 py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5, margin: "-30px 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10"
        >
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <Code2 className="text-cyan-400" size={30} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 py-1.5 leading-normal">
            Technical Arsenal
          </h2>
        </motion.div>

        {/* 3-Column Grid with rich, visible staggered entrance */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "-40px 0px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`group relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl bg-slate-900/80 dark:bg-zinc-950/80 border border-white/15 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-start shadow-xl overflow-hidden ${category.bgGlow}`}
              >
                {/* Subtle top ambient glow */}
                <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-white/5 blur-2xl group-hover:bg-cyan-500/10 transition-all duration-500 pointer-events-none" />

                {/* Header: Original Preferred Icon + Title */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 group-hover:border-white/30 transition-all duration-300 shadow-md">
                    <Icon className={category.color} size={22} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {category.title}
                  </h3>
                </div>
                
                {/* Fast, fluid one-by-one sequential skill chips */}
                <motion.div 
                  variants={chipContainerVariants}
                  className="flex flex-wrap gap-2 relative z-10 w-full"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      variants={chipPop}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/40 text-gray-200 hover:text-white transition-colors duration-150 cursor-default select-none shadow-sm inline-block will-change-transform"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
