import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Terminal,
} from 'lucide-react';
import {
  LeetCodeIcon,
  CodeforcesIcon,
  CodeChefIcon,
  GitHubIcon,
  GFGIcon,
} from './icons/PlatformIcons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ContestRatings({ contestData }) {
  const { stats, recentHighlights } = contestData || {};

  if (!stats) return null;

  return (
    <section id="coding" className="relative z-10 py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with generous descender padding so 'g' in Coding is never clipped */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10 overflow-visible"
        >
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shrink-0">
            <Terminal className="text-cyan-400" size={30} />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 pt-1 pb-3 px-1 leading-normal tracking-tight overflow-visible inline-block">
            Coding Profiles
          </h2>
        </motion.div>

        {/* 5 Platform KPI Cards with balanced, polished alignment */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.12 }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5"
        >
          {/* LeetCode Card */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl bg-slate-900/80 dark:bg-zinc-950/80 border border-orange-500/30 hover:border-orange-500/60 ring-1 ring-white/5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3.5">
                <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-md group-hover:scale-105 transition-transform">
                  <LeetCodeIcon size={24} className="text-orange-400" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/15 text-orange-300 border border-orange-500/30">
                  {stats.leetcode.rankTitle}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">LeetCode</h3>
              <a 
                href={stats.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-orange-400/90 hover:text-orange-300 hover:underline inline-flex items-center gap-1 mt-0.5 mb-3"
              >
                {stats.leetcode.username} <ExternalLink size={10} />
              </a>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stats.leetcode.currentRating}</span>
                <span className="text-xs text-orange-300 font-medium">({stats.leetcode.topPercentage})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs mt-3 relative z-10">
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-semibold">Best Rank</p>
                <p className="text-white font-bold mt-0.5 text-xs">#{stats.leetcode.bestRank || 215}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-semibold">Contests</p>
                <p className="text-white font-bold mt-0.5 text-xs">{stats.leetcode.totalContests} Attended</p>
              </div>
            </div>
          </motion.div>

          {/* Codeforces Card */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl bg-slate-900/80 dark:bg-zinc-950/80 border border-blue-500/30 hover:border-blue-500/60 ring-1 ring-white/5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md group-hover:scale-105 transition-transform">
                  <CodeforcesIcon size={24} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  {stats.codeforces.rankTitle}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">Codeforces</h3>
              <a 
                href={stats.codeforces.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400/90 hover:text-blue-300 hover:underline inline-flex items-center gap-1 mt-0.5 mb-3"
              >
                {stats.codeforces.username} <ExternalLink size={10} />
              </a>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stats.codeforces.currentRating}</span>
                <span className="text-xs text-blue-300 font-medium">Max: {stats.codeforces.maxRating}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs mt-3 relative z-10">
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-semibold">Global Rank</p>
                <p className="text-white font-bold mt-0.5 text-xs">#{stats.codeforces.bestRank}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-semibold">Contests</p>
                <p className="text-white font-bold mt-0.5 text-xs">{stats.codeforces.totalContests} Attended</p>
              </div>
            </div>
          </motion.div>

          {/* CodeChef Card */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl bg-slate-900/80 dark:bg-zinc-950/80 border border-yellow-500/30 hover:border-yellow-500/60 ring-1 ring-white/5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3.5">
                <div className="w-11 h-11 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shadow-md group-hover:scale-105 transition-transform">
                  <CodeChefIcon size={24} className="text-yellow-400" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-yellow-500/15 text-yellow-300 border border-yellow-500/30">
                  {stats.codechef.stars}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors">CodeChef</h3>
              <a 
                href={stats.codechef.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-yellow-400/90 hover:text-yellow-300 hover:underline inline-flex items-center gap-1 mt-0.5 mb-3"
              >
                {stats.codechef.username} <ExternalLink size={10} />
              </a>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stats.codechef.currentRating}</span>
                <span className="text-xs text-yellow-300 font-medium">Max: {stats.codechef.maxRating}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs mt-3 relative z-10">
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-semibold">Global Rank</p>
                <p className="text-white font-bold mt-0.5 text-xs">#{stats.codechef.bestRank}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-semibold">Contests</p>
                <p className="text-white font-bold mt-0.5 text-xs">{stats.codechef.totalContests} Attended</p>
              </div>
            </div>
          </motion.div>

          {/* GeeksforGeeks Card */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl bg-slate-900/80 dark:bg-zinc-950/80 border border-emerald-500/30 hover:border-emerald-500/60 ring-1 ring-white/5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-md group-hover:scale-105 transition-transform">
                  <GFGIcon size={24} className="text-emerald-400" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {stats.gfg?.rankTitle || "Active Solver"}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">GeeksforGeeks</h3>
              <a 
                href={stats.gfg?.url || "https://www.geeksforgeeks.org/profile/abhiyandr5wci?tab=activity"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400/90 hover:text-emerald-300 hover:underline inline-flex items-center gap-1 mt-0.5 mb-3"
              >
                @abhiyandr5wci <ExternalLink size={10} />
              </a>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{stats.gfg?.codingScore || 118}</span>
                <span className="text-xs text-emerald-300 font-medium">Coding Score</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs mt-3 relative z-10">
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-semibold tracking-wider">Solved</p>
                <p className="text-white font-bold mt-0.5 text-xs">{stats.gfg?.totalSolved || 31}+ Problems</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-semibold tracking-wider">DSA Score</p>
                <p className="text-white font-bold mt-0.5 text-xs">118 Points</p>
              </div>
            </div>
          </motion.div>

          {/* GitHub Card - Authentic GitHub Dark / Black Theme */}
          <motion.div 
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="group relative p-5 sm:p-6 rounded-2xl backdrop-blur-xl bg-slate-900/80 dark:bg-zinc-950/80 border border-slate-700/40 dark:border-zinc-700/50 hover:border-slate-400/60 dark:hover:border-zinc-400/60 ring-1 ring-white/5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-slate-500/10 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-slate-500/20 dark:group-hover:bg-white/10 transition-all pointer-events-none" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-800/80 dark:bg-zinc-900 border border-slate-700/60 dark:border-zinc-700/60 flex items-center justify-center text-slate-100 shadow-md group-hover:scale-105 transition-transform">
                  <GitHubIcon size={24} className="text-slate-900 dark:text-white" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-300 dark:border-zinc-700">
                  Version Control
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">GitHub</h3>
              <a 
                href="https://github.com/AbhijithKumar-07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:underline inline-flex items-center gap-1 mt-0.5 mb-3 font-mono"
              >
                @AbhijithKumar-07 <ExternalLink size={10} />
              </a>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">35+</span>
                <span className="text-xs text-slate-600 dark:text-zinc-400 font-medium">Public Repos</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-white/10 text-xs mt-3 relative z-10">
              <div>
                <p className="text-slate-500 dark:text-gray-400 text-[10px] uppercase font-semibold tracking-wider">Repositories</p>
                <p className="text-slate-900 dark:text-white font-bold mt-0.5 text-xs">35+ Active</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-gray-400 text-[10px] uppercase font-semibold tracking-wider">Activity</p>
                <p className="text-slate-900 dark:text-white font-bold mt-0.5 text-xs">Daily Commits</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
