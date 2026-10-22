import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2, MessageSquare, MapPin, Radio, Terminal } from 'lucide-react';

const iconComponents = {
  MessageSquare: MessageSquare,
  MapPin: MapPin,
  Radio: Radio,
  Terminal: Terminal,
};

const ProjectCard = ({ project, index, variants }) => {
  const FallbackIcon = (project.icon && iconComponents[project.icon]) ? iconComponents[project.icon] : Code2;

  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`group relative p-7 sm:p-8 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-white/15 ring-1 ring-white/5 overflow-hidden transition-all duration-500 ${project.borderHover || 'hover:border-cyan-400/40'} shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full`}
    >
      {/* Background dynamic ambient glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor || 'from-cyan-500/10 via-transparent to-transparent'} opacity-30 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none`} />

      {/* Top Section */}
      <div className="relative z-10 w-full flex flex-col flex-grow">
        
        {/* Header row with Icon/Image and Action Links */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 group-hover:border-white/20 transition-all duration-300 shadow-lg">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className={`w-full h-full object-contain filter drop-shadow ${
                    project.invertOnDark ? 'dark:invert dark:brightness-200' : ''
                  }`} 
                />
              ) : (
                <FallbackIcon className="w-6 h-6 text-emerald-400" />
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300 leading-snug">
              {project.title}
            </h3>
          </div>

          {/* Action Links without title tooltips */}
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all border border-white/5 hover:border-white/20 hover:scale-105"
              >
                <Github size={18} />
              </a>
            )}
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Live Demo"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all border border-white/5 hover:border-cyan-400/30 hover:scale-105"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Project Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-6 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2 mt-auto border-t border-white/5">
          {project.tech.map((tag, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-gray-300 group-hover:text-cyan-200 group-hover:border-cyan-400/25 transition-colors duration-300 select-none"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;
