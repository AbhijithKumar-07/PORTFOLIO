import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../assets/Abhijith_profile.png";
import {
  ExternalLink,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Code2,
  Trophy,
  Bell,
  Newspaper,
  GitCommit,
  ArrowUpRight,
  Radio,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Activity,
  FileText,
  Mail,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  LeetCodeIcon,
  CodeforcesIcon,
  CodeChefIcon,
  GFGIcon,
  GitHubIcon,
} from "./icons/PlatformIcons";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.85, rotate: -6 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const CustomTooltip = ({ active, payload, selectedPlatform }) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;

  return (
    <div className="backdrop-blur-xl bg-black/95 border border-white/15 rounded-2xl p-3.5 shadow-2xl text-xs max-w-xs transition-all pointer-events-none z-50">
      <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-white/10">
        <span className="font-semibold text-gray-300">
          {new Date(point.date).toLocaleDateString("default", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        {point.platform && (
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
              point.platform === "LeetCode"
                ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                : point.platform === "Codeforces"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
            }`}
          >
            {point.platform === "LeetCode" && <LeetCodeIcon size={11} className="text-orange-400" />}
            {point.platform === "Codeforces" && <CodeforcesIcon size={11} />}
            {point.platform === "CodeChef" && <CodeChefIcon size={11} className="text-yellow-400" />}
            <span>{point.platform}</span>
          </span>
        )}
      </div>

      {point.contestName && (
        <p className="text-white font-medium text-xs mb-2 leading-snug line-clamp-2">
          {point.contestName}
        </p>
      )}

      {selectedPlatform === "All" ? (
        <div className="space-y-1.5 pt-1 border-t border-white/5">
          {point.LeetCode && (
            <div className="flex justify-between items-center text-gray-300">
              <span className="flex items-center gap-1.5 text-orange-400 font-medium">
                <LeetCodeIcon size={12} className="text-orange-400" /> LeetCode:
              </span>
              <span className="font-bold text-white">{point.LeetCode}</span>
            </div>
          )}
          {point.CodeChef && (
            <div className="flex justify-between items-center text-gray-300">
              <span className="flex items-center gap-1.5 text-yellow-400 font-medium">
                <CodeChefIcon size={12} className="text-yellow-400" /> CodeChef:
              </span>
              <span className="font-bold text-white">{point.CodeChef}</span>
            </div>
          )}
          {point.Codeforces && (
            <div className="flex justify-between items-center text-gray-300">
              <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                <CodeforcesIcon size={12} /> Codeforces:
              </span>
              <span className="font-bold text-white">{point.Codeforces}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-1.5">
          {point.contestRating && (
            <div className="flex justify-between items-center text-gray-300">
              <span>Rating:</span>
              <span className="font-bold text-white text-sm">
                {point.contestRating}
                {point.delta !== undefined && point.delta !== null && (
                  <span
                    className={`ml-1 text-xs ${
                      point.delta >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    ({point.delta >= 0 ? `+${point.delta}` : point.delta})
                  </span>
                )}
              </span>
            </div>
          )}

          {point.contestRank && (
            <div className="flex justify-between items-center text-gray-400">
              <span>Global Rank:</span>
              <span className="font-semibold text-cyan-300">
                #{point.contestRank.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Fallback verified recent activities from real submissions
const RECENT_TIMELINE_CARDS = [
  {
    id: "act-lc-1",
    platform: "LeetCode",
    title: "Find Eventual Safe States",
    type: "Graph / Topological DFS",
    time: "4d ago",
    badge: "Accepted · C++",
    url: "https://leetcode.com/problems/find-eventual-safe-states/",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  },
  {
    id: "act-gh-1",
    platform: "GitHub",
    title: "Pushed to Code-Sync (refs/heads/main)",
    type: "Git Push Event",
    time: "3w ago",
    badge: "main · Commit",
    url: "https://github.com/AbhijithKumar-07/Code-Sync",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  },
  {
    id: "act-lc-2",
    platform: "LeetCode",
    title: "Best Time to Buy and Sell Stock",
    type: "Dynamic Programming / Greedy",
    time: "1mo ago",
    badge: "Accepted · C++",
    url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  },
  {
    id: "act-lc-3",
    platform: "LeetCode",
    title: "Course Schedule II",
    type: "Topological Sort / Kahn's Algo",
    time: "1mo ago",
    badge: "Accepted · C++",
    url: "https://leetcode.com/problems/course-schedule-ii/",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  },
  {
    id: "act-lc-4",
    platform: "LeetCode",
    title: "Course Schedule",
    type: "Cycle Detection / BFS",
    time: "1mo ago",
    badge: "Accepted · C++",
    url: "https://leetcode.com/problems/course-schedule/",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  },
];

export default function Hero({ contestData }) {
  const { timeline, stats, recentActivities } = contestData || {};
  const activitiesToDisplay = recentActivities && recentActivities.length > 0 ? recentActivities : RECENT_TIMELINE_CARDS;

  const [selectedPlatform, setSelectedPlatform] = useState("All");

  // Dynamic Y-axis scale based on platform selection to ensure optimal resolution
  const yDomain = useMemo(() => {
    if (selectedPlatform === "LeetCode") return [1600, 2050];
    if (selectedPlatform === "Codeforces") return [1000, 1550];
    if (selectedPlatform === "CodeChef") return [1300, 1850];
    return [950, 2050];
  }, [selectedPlatform]);

  // Filter timeline according to selected platform
  const filteredTimeline = useMemo(() => {
    if (!timeline) return [];
    if (selectedPlatform === "All") return timeline;
    return timeline.filter((item) => item.platform === selectedPlatform);
  }, [timeline, selectedPlatform]);

  return (
    <motion.section
      id="home"
      variants={container}
      initial="hidden"
      animate="show"
      className="relative min-h-[92vh] flex items-center mb-6 md:mb-12 overflow-hidden w-full pt-2 md:pt-4"
    >
      <div className="absolute inset-0 -z-10 w-full h-full">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 flex flex-col gap-6 md:gap-8 pt-4 pb-8">
        {/* Top Section: Intro Text & Profile Avatar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="max-w-xl z-10 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            {/* Top Professional Opportunity Pill */}
            <motion.div
              variants={fadeUp}
              className="group relative inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full backdrop-blur-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-50/80 dark:via-black/50 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.12)] transition-all duration-300 mb-5 cursor-default select-none"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
              <span className="text-xs sm:text-sm font-semibold tracking-normal text-emerald-800 dark:text-emerald-200/90">
                Open to Software Engineering Roles
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pb-2"
            >
              Abhijith Kumar Yandrapu
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-400 mt-4 md:mt-6 text-base sm:text-lg md:text-xl"
            >
              B.Tech CSE @ IIIT Ranchi · Full-Stack Developer · Real-Time Systems &amp; Backend Architecture
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-6 md:mt-8 flex flex-wrap gap-3.5 justify-center lg:justify-start items-center"
            >
              {/* Resume Button */}
              <a
                href="/Abhijith_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/20 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-white text-sm font-semibold shadow-sm hover:shadow-md"
              >
                <FileText size={15} />
                <span>Resume</span>
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/AbhijithKumar-07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/20 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-white text-sm font-semibold shadow-sm hover:shadow-md group/gh"
              >
                <GitHubIcon size={15} className="text-white group-hover/gh:text-black transition-colors" />
                <span>GitHub</span>
              </a>

              {/* Contact Me Button */}
              <a
                href="#contact"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 px-5 py-2.5 rounded-full hover:from-emerald-500 hover:to-teal-600 hover:text-white transition-all duration-300 hover:scale-105 text-emerald-400 text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              >
                <Mail size={15} />
                <span>Contact Me</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={imageAnim}
            className="relative flex items-center justify-center z-10 shrink-0 lg:pr-10 xl:pr-16 w-full lg:w-auto"
          >
            <div className="relative p-6">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #22d3ee 270deg, #3b82f6 360deg)",
                  }}
                />
                <div className="absolute -inset-3 rounded-full border-2 border-white/5" />

                <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 rounded-full overflow-hidden border border-black/10 dark:border-white/20 backdrop-blur-xl bg-black/5 dark:bg-white/5 shadow-2xl flex items-center justify-center relative p-1">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20" />
                  <img
                    src={profileImg}
                    alt="Abhijith Kumar Yandrapu"
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110 relative z-10"
                  />
                </div>

                <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-500/30 blur-2xl -z-10" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Continuous Horizontal Notification Banners (Above Contest Rating History) */}
        <motion.div
          variants={fadeUp}
          className="w-full max-w-full lg:max-w-[92%] mb-4 overflow-hidden relative group rounded-2xl"
        >
          {/* Edge gradient fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#f8fafc] dark:from-[#030712] via-[#f8fafc]/90 dark:via-[#030712]/90 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#f8fafc] dark:from-[#030712] via-[#f8fafc]/90 dark:via-[#030712]/90 to-transparent z-10" />

          <style>{`
            @keyframes smoothTickerTrack {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .smooth-ticker {
              display: flex;
              align-items: center;
              gap: 0.85rem;
              width: max-content;
              animation: smoothTickerTrack 24s linear infinite;
            }
            .smooth-ticker:hover {
              animation-play-state: paused !important;
            }
          `}</style>

          <div className="smooth-ticker py-1">
            {[...activitiesToDisplay, ...activitiesToDisplay].map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all shrink-0 whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg group/card"
              >
                {/* Platform Icon */}
                <div className="p-1.5 rounded-lg bg-black/60 border border-white/10 shrink-0 group-hover/card:scale-110 group-hover/card:border-white/20 transition-all">
                  {item.platform === "GitHub" && <GitHubIcon size={15} className="text-white" />}
                  {item.platform === "LeetCode" && <LeetCodeIcon size={15} className="text-orange-400" />}
                  {item.platform === "GeeksforGeeks" && <GFGIcon size={15} className="text-emerald-400" />}
                  {item.platform === "CodeChef" && <CodeChefIcon size={15} className="text-yellow-400" />}
                  {item.platform === "Codeforces" && <CodeforcesIcon size={15} />}
                </div>

                {/* Problem / Commit Text */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="font-bold text-gray-300 uppercase tracking-wider">
                      {item.platform}
                    </span>
                    <span className="text-gray-600">·</span>
                    <span className="text-gray-400 font-mono">
                      {item.time}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white group-hover/card:text-cyan-300 transition-colors max-w-[210px] sm:max-w-[290px] truncate">
                    {item.title}
                  </span>
                </div>

                {/* Professional Status Pill & Arrow */}
                <div className="flex items-center gap-2 ml-1">
                  {item.platform === "GitHub" ? (
                    /* High-End Two-Tone Dev Pill for GitHub Commits */
                    <div className="inline-flex items-center rounded-lg bg-black/60 border border-purple-500/30 p-0.5 shadow-sm overflow-hidden text-[10px] font-mono">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 font-bold text-purple-300 tracking-tight">
                        <GitCommit size={11} className="text-purple-400 shrink-0" />
                        <span>{item.badge.includes("·") ? item.badge.split("·")[0].trim() : "main"}</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-200 font-bold text-[9px] uppercase tracking-wider border-l border-purple-500/30">
                        Commit
                      </span>
                    </div>
                  ) : item.type === "Contest Shift" ? (
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-200 shadow-sm">
                      <Trophy size={11} className="text-amber-400 shrink-0" />
                      <span>{item.badge}</span>
                    </span>
                  ) : (
                    /* High-End Two-Tone Dev Pill for Solved Problems (LeetCode, GFG, Codeforces) */
                    <div className="inline-flex items-center rounded-lg bg-black/60 border border-emerald-500/30 p-0.5 shadow-sm overflow-hidden text-[10px] font-mono">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 font-bold text-emerald-400 tracking-tight">
                        <CheckCircle2 size={11} className="text-emerald-400 shrink-0" />
                        <span>Solved</span>
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 font-semibold text-[9px] uppercase tracking-wider border-l border-emerald-500/20">
                        {item.badge && item.badge.includes("·")
                          ? item.badge.split("·")[1].trim()
                          : "C++"}
                      </span>
                    </div>
                  )}
                  <ArrowUpRight size={13} className="text-gray-500 group-hover/card:text-cyan-300 transition-colors shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Contest Rating Graph in the Home Section */}
        {stats && (
          <motion.div
            variants={fadeUp}
            className="w-full rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-white/15 ring-1 ring-white/5 p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Header: Title, Brand Tabs & Refresh Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    Contest Rating History
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Platform Filter Buttons with Official Icons */}
                <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10 gap-1 select-none">
                  {[
                    { id: "All", label: "All Platforms", icon: <TrendingUp size={13} />, activeClass: "bg-white text-black shadow-sm font-bold" },
                    { id: "LeetCode", label: "LeetCode", icon: <LeetCodeIcon size={14} className="text-orange-400" />, activeClass: "bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-sm font-bold" },
                    { id: "Codeforces", label: "Codeforces", icon: <CodeforcesIcon size={14} />, activeClass: "bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm font-bold" },
                    { id: "CodeChef", label: "CodeChef", icon: <CodeChefIcon size={14} className="text-yellow-400" />, activeClass: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-sm font-bold" },
                  ].map((btn) => {
                    const isSelected = selectedPlatform === btn.id;
                    return (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setSelectedPlatform(btn.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border border-transparent transition-colors duration-150 ${
                          isSelected
                            ? btn.activeClass
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {btn.icon}
                        <span>{btn.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Platform Metrics Summary Strip with Official Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
              {/* LeetCode Card */}
              <a
                href={stats.leetcode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/15 border border-orange-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    <LeetCodeIcon size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                        LeetCode
                      </p>
                      <ExternalLink size={10} className="text-gray-500 group-hover:text-orange-400" />
                    </div>
                    <p className="text-[11px] text-orange-300/90 font-medium mt-0.5">
                      {stats.leetcode.rankTitle} · {stats.leetcode.topPercentage?.includes("Top") ? stats.leetcode.topPercentage : `Top ${stats.leetcode.topPercentage}`}
                    </p>
                  </div>
                </div>
                <div className="text-right -translate-y-0.5">
                  <p className="text-xl font-extrabold text-white tracking-tight">{stats.leetcode.currentRating}</p>
                  <p className="text-[10px] text-orange-300/80 font-medium">Best #{stats.leetcode.bestRank || 215}</p>
                </div>
              </a>

              {/* Codeforces Card */}
              <a
                href={stats.codeforces.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    <CodeforcesIcon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                        Codeforces
                      </p>
                      <ExternalLink size={10} className="text-gray-500 group-hover:text-blue-400" />
                    </div>
                    <p className="text-[11px] text-blue-300/90 font-medium mt-0.5">
                      {stats.codeforces.rankTitle} · 12 Contests
                    </p>
                  </div>
                </div>
                <div className="text-right -translate-y-0.5">
                  <p className="text-xl font-extrabold text-white tracking-tight">{stats.codeforces.currentRating}</p>
                  <p className="text-[10px] text-blue-300/80 font-medium">Best #{stats.codeforces.bestRank}</p>
                </div>
              </a>

              {/* CodeChef Card */}
              <a
                href={stats.codechef.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-yellow-500/15 border border-yellow-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    <CodeChefIcon size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white group-hover:text-yellow-400 transition-colors">
                        CodeChef
                      </p>
                      <ExternalLink size={10} className="text-gray-500 group-hover:text-yellow-400" />
                    </div>
                    <p className="text-[11px] text-yellow-300/90 font-medium mt-0.5">
                      {stats.codechef.stars} · {stats.codechef.contestsAttended || 7} Contests
                    </p>
                  </div>
                </div>
                <div className="text-right -translate-y-0.5">
                  <p className="text-xl font-extrabold text-white tracking-tight">{stats.codechef.currentRating}</p>
                  <p className="text-[10px] text-yellow-300/80 font-medium">Best #{stats.codechef.bestRank || 23}</p>
                </div>
              </a>

              {/* GeeksforGeeks Card */}
              <a
                href={stats.gfg?.url || "https://www.geeksforgeeks.org/profile/abhiyandr5wci?tab=activity"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/25 shrink-0 group-hover:scale-105 transition-transform">
                    <GFGIcon size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        GeeksforGeeks
                      </p>
                      <ExternalLink size={10} className="text-gray-500 group-hover:text-emerald-400" />
                    </div>
                    <p className="text-[11px] text-emerald-300/90 font-medium mt-0.5">
                      {stats.gfg?.totalSolved || 31} Problems · Solved
                    </p>
                  </div>
                </div>
                <div className="text-right -translate-y-0.5">
                  <p className="text-xl font-extrabold text-white tracking-tight">{stats.gfg?.codingScore || 118}</p>
                  <p className="text-[10px] text-emerald-300/80 font-medium">Score</p>
                </div>
              </a>
            </div>

            {/* The Graph */}
            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                {selectedPlatform === "All" ? (
                  /* Clean, Non-Messy Multi-Platform Line Chart */
                  <LineChart
                    data={filteredTimeline}
                    margin={{ top: 10, right: 10, bottom: 0, left: -10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-white/[0.06] dark:text-white/[0.06] light:text-slate-900/10 contest-grid-line" />
                    <XAxis
                      dataKey="date"
                      minTickGap={50}
                      tickFormatter={(str) => {
                        const d = new Date(str);
                        return d.toLocaleDateString("default", {
                          month: "short",
                          year: "2-digit",
                        });
                      }}
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={yDomain}
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip selectedPlatform={selectedPlatform} />} />
                    <Line
                      type="monotone"
                      dataKey="LeetCode"
                      stroke="#f97316"
                      strokeWidth={2.5}
                      connectNulls={true}
                      dot={{ r: 2.5, fill: "#f97316" }}
                      activeDot={{ r: 5.5, fill: "#f97316", stroke: "#000", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="CodeChef"
                      stroke="#eab308"
                      strokeWidth={2.5}
                      connectNulls={true}
                      dot={{ r: 2.5, fill: "#eab308" }}
                      activeDot={{ r: 5.5, fill: "#eab308", stroke: "#000", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Codeforces"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      connectNulls={true}
                      dot={{ r: 2.5, fill: "#3b82f6" }}
                      activeDot={{ r: 5.5, fill: "#3b82f6", stroke: "#000", strokeWidth: 2 }}
                    />
                  </LineChart>
                ) : (
                  /* Single-Platform High-Resolution Area Chart with Gradient Fill */
                  <AreaChart
                    data={filteredTimeline}
                    margin={{ top: 10, right: 10, bottom: 0, left: -10 }}
                  >
                    <defs>
                      <linearGradient id="colorPlatformHero" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={
                            selectedPlatform === "LeetCode"
                              ? "#f97316"
                              : selectedPlatform === "Codeforces"
                              ? "#3b82f6"
                              : "#eab308"
                          }
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor={
                            selectedPlatform === "LeetCode"
                              ? "#f97316"
                              : selectedPlatform === "Codeforces"
                              ? "#3b82f6"
                              : "#eab308"
                          }
                          stopOpacity={0.0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-white/[0.06] dark:text-white/[0.06] light:text-slate-900/10 contest-grid-line" />
                    <XAxis
                      dataKey="date"
                      minTickGap={50}
                      tickFormatter={(str) => {
                        const d = new Date(str);
                        return d.toLocaleDateString("default", {
                          month: "short",
                          year: "2-digit",
                        });
                      }}
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      domain={yDomain}
                      tick={{ fill: "#6b7280", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip selectedPlatform={selectedPlatform} />} />
                    <Area
                      type="monotone"
                      dataKey="contestRating"
                      stroke={
                        selectedPlatform === "LeetCode"
                          ? "#f97316"
                          : selectedPlatform === "Codeforces"
                          ? "#3b82f6"
                          : "#eab308"
                      }
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorPlatformHero)"
                      dot={{
                        r: 3,
                        fill:
                          selectedPlatform === "LeetCode"
                            ? "#f97316"
                            : selectedPlatform === "Codeforces"
                            ? "#3b82f6"
                            : "#eab308",
                        strokeWidth: 0,
                      }}
                      activeDot={{
                        r: 6,
                        fill:
                          selectedPlatform === "LeetCode"
                            ? "#f97316"
                            : selectedPlatform === "Codeforces"
                            ? "#3b82f6"
                            : "#eab308",
                        stroke: "#000",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}