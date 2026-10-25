import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: "easeOut" }
  }
};

const Projects = () => {
  return (
    <section id="projects" className="relative z-10 py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5, margin: "-40px 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12"
        >
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <Code2 className="text-cyan-400" size={30} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-2 leading-normal">
            Featured Work
          </h2>
        </motion.div>

        {/* Balanced 2x2 Grid Layout - Animates as cards enter view */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: "-50px 0px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.05
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              variants={{
                hidden: { opacity: 0, y: 55, scale: 0.94 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.55,
                    ease: [0.25, 1, 0.5, 1]
                  }
                }
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
