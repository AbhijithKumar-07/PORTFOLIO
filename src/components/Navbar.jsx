import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { House, User, CodeXml, Layers, Mail, Briefcase, TerminalSquare, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { name: 'Home', icon: House, href: '#home' },
  { name: 'About', icon: User, href: '#about' },
  { name: 'Experience', icon: Briefcase, href: '#experience' },
  { name: 'Projects', icon: CodeXml, href: '#projects' },
  { name: 'Skills', icon: Layers, href: '#skills' },
  { name: 'Coding', icon: TerminalSquare, href: '#coding' },
  { name: 'Contact', icon: Mail, href: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState(() => {
    try {
      const savedSection = sessionStorage.getItem('portfolio_active_section');
      const initialHash = window.location.hash || (savedSection ? `#${savedSection}` : '');
      if (initialHash) {
        const matched = navItems.find((item) => item.href === initialHash);
        if (matched) return matched.name;
      }
    } catch (e) {}
    return 'Home';
  });
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [useCollapsed, setUseCollapsed] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  const checkOverflow = useCallback(() => {
    const threshold = 1024;
    setUseCollapsed(window.innerWidth < threshold);
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [checkOverflow]);

  // Robust, jitter-free scroll section observer
  useEffect(() => {
    let lastHash = window.location.hash;
    let isInitialMount = true;

    const updateActiveSection = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (isClickScrollingRef.current) return;

      // On initial mount before restoration finishes, if scrollY is 0 but we have a non-home target, don't overwrite with home!
      const savedSection = sessionStorage.getItem('portfolio_active_section');
      const targetHash = window.location.hash || (savedSection ? `#${savedSection}` : '');
      if (isInitialMount && window.scrollY < 50 && targetHash && targetHash !== '#home') {
        return;
      }

      const viewportAnchor = window.scrollY + window.innerHeight * 0.35;
      let currentSection = navItems[0];

      for (const item of navItems) {
        const el = document.getElementById(item.href.substring(1));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (viewportAnchor >= top - 80 && viewportAnchor < top + height) {
            currentSection = item;
            break;
          }
        }
      }

      setActive(currentSection.name);
      sessionStorage.setItem('portfolio_active_section', currentSection.href.substring(1));

      // Keep window location hash in sync silently without triggering scroll jumps
      if (currentSection.href !== lastHash && window.history?.replaceState) {
        lastHash = currentSection.href;
        window.history.replaceState(null, '', currentSection.href);
      }
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
    setTimeout(() => {
      isInitialMount = false;
      updateActiveSection();
    }, 400);

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  const handleNavClick = (item, e) => {
    if (e) e.preventDefault();
    setActive(item.name);
    sessionStorage.setItem('portfolio_active_section', item.href.substring(1));
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    const targetId = item.href.substring(1);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        // Calculated offset: 35px extra clearance so previous section bottom is completely out of frame
        const yOffset = -35;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }

    // Update URL hash without jumping
    if (window.history?.replaceState) {
      window.history.replaceState(null, '', item.href);
    }

    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);
  };

  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener('scroll', close);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  const navBg = scrolled
    ? isDark
      ? 'bg-slate-950/75 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/10'
      : 'bg-white/80 backdrop-blur-2xl border border-slate-900/10 shadow-[0_12px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5'
    : isDark
      ? 'bg-slate-950/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
      : 'bg-white/70 backdrop-blur-xl border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.1)]';

  return (
    <>
      {/* Desktop Vertical Dock centered in the Top-Right Free Space */}
      {!useCollapsed && (
        <nav
          className="fixed right-6 sm:right-8 xl:right-12 top-8 lg:top-12 z-50 pointer-events-auto"
        >
          <div
            ref={containerRef}
            className={`flex flex-col items-center p-2 rounded-full transition-colors duration-300 backdrop-saturate-150 gap-2.5 ${navBg}`}
          >
            {navItems.map((item) => {
              const isActive = active === item.name;
              const isHovered = hoveredNode === item.name;
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  onMouseEnter={() => setHoveredNode(item.name)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="relative p-2.5 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer select-none group"
                  aria-label={item.name}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-gradient-to-b from-cyan-500/25 via-blue-500/20 to-cyan-500/25 dark:from-cyan-500/30 dark:via-blue-500/25 dark:to-cyan-500/30 rounded-full border border-cyan-500/40 dark:border-cyan-400/50 shadow-[0_2px_12px_rgba(6,182,212,0.3)] dark:shadow-[0_0_18px_rgba(34,211,238,0.4)]"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 32,
                        mass: 0.8,
                      }}
                    />
                  )}

                  <Icon
                    size={19}
                    className={`relative z-10 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? isDark
                          ? 'text-cyan-300'
                          : 'text-cyan-800'
                        : isDark
                        ? 'text-gray-400 group-hover:text-white'
                        : 'text-slate-600 group-hover:text-slate-900'
                    }`}
                    strokeWidth={isActive ? 2.6 : 2}
                  />

                  {/* Tooltip popping to the left into view */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 10, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 6, scale: 0.95 }}
                        transition={{ duration: 0.16, ease: 'easeOut' }}
                        className={`absolute right-full mr-3.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shadow-xl border pointer-events-none flex items-center gap-1.5 ${
                          isDark
                            ? 'bg-slate-900/95 border-white/15 text-white shadow-black/60'
                            : 'bg-white/95 border-black/10 text-slate-800 shadow-black/10'
                        }`}
                      >
                        <span className={isActive ? 'text-cyan-400' : ''}>{item.name}</span>
                        <div
                          className={`absolute left-full top-1/2 -translate-y-1/2 -ml-[5px] border-4 border-transparent ${
                            isDark ? 'border-l-slate-900/95' : 'border-l-white/95'
                          }`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </a>
              );
            })}

            <div className={`w-5 h-px my-1 ${isDark ? 'bg-white/15' : 'bg-black/15'}`} />

            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                isDark ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-slate-600 hover:bg-slate-900/10'
              }`}
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={19} /> : <Moon size={19} />}
              </motion.div>
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Top Bar (when collapsed) */}
      {useCollapsed && (
        <nav
          className="fixed top-4 right-4 z-50 pointer-events-auto"
        >
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-saturate-150 ${navBg}`}>
            <span className={`text-sm font-semibold mr-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {active}
            </span>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${
                isDark ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-slate-600 hover:bg-slate-900/10'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-all ${
                isDark ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-black/5'
              }`}
              aria-label="Open menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      )}

      <AnimatePresence>
        {isOpen && useCollapsed && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed inset-0 z-40 flex flex-col pt-28 px-8 pb-10 backdrop-blur-3xl ${isDark ? 'bg-black/70' : 'bg-white/75'}`}
          >
            <div className="flex flex-col gap-3 flex-grow justify-center">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = active === item.name;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={(e) => { handleNavClick(item, e); setIsOpen(false); }}
                    className={`flex items-center gap-5 px-5 py-4 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30'
                        : isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                    }`}
                  >
                    <Icon size={22} className={isActive ? 'text-cyan-400' : isDark ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={`text-lg font-medium ${isActive ? 'text-cyan-400' : isDark ? 'text-white' : 'text-gray-800'}`}>
                      {item.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
