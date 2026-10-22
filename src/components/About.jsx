import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Counter = ({ target, suffix = "", duration = 1800 }) => {
  const [count, setCount] = React.useState(0);
  const containerRef = React.useRef(null);
  const inViewRef = React.useRef(false);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!inViewRef.current) {
            inViewRef.current = true;
            setInView(true);
          }
        } else {
          inViewRef.current = false;
          setInView(false);
          setCount(0);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    if (target <= 5) {
      // Visible, well-paced step for 2x:
      // Holds 0 briefly (200ms), steps clearly to 1 (400ms), then steps to 2 (800ms)
      // Total duration ~800ms: crisp, distinct, and perfectly visible
      let current = 0;
      setCount(0);
      const stepDuration = 380;
      const interval = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= target) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }

    // Smooth cubic ease-out for 300+
    let startTimestamp = null;
    let animationFrame;
    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, target, duration]);

  return (
    <span ref={containerRef} className="tabular-nums inline-block tracking-tight font-extrabold">
      <motion.span
        key={count}
        initial={target <= 5 ? { y: 4, opacity: 0.35, scale: 0.94 } : false}
        animate={target <= 5 ? { y: 0, opacity: 1, scale: 1 } : false}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="inline-block"
      >
        {count}{suffix}
      </motion.span>
    </span>
  );
};

const About = () => {
  return (
    <section id="about" className="relative z-10 py-12 md:py-16 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.2 }}
           variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold mb-6 md:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 inline-block pb-2 leading-normal"
          >
            About Me
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            <motion.div variants={fadeUp} className="h-full space-y-5 text-gray-300 text-base md:text-lg leading-relaxed font-light bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-3xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/5 relative z-20 flex flex-col justify-center">
              <p>
                Hi, I'm <strong className="text-white font-medium">Abhijith Kumar Yandrapu</strong>. I'm a <strong className="text-cyan-400 font-medium">Computer Science &amp; Engineering</strong> student at IIIT Ranchi, focused on building robust digital experiences.
              </p>
              <p>
                I'm deeply passionate about <strong className="text-white font-medium">Backend Engineering, AI/ML, and Full-Stack Development</strong>. My work spans building scalable REST APIs, developing AI/ML solutions, and creating real-time web applications that solve meaningful problems.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-6 h-full">
               
               <div className="grid grid-cols-2 gap-4 sm:gap-6">
                 <motion.div 
                   whileHover={{ y: -5, scale: 1.02 }} 
                   className="p-6 rounded-2xl backdrop-blur-xl bg-slate-900/80 border border-white/15 hover:border-blue-500/50 hover:bg-slate-900/95 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative z-20"
                 >
                    <h3 className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">
                      <Counter target={300} suffix="+" duration={1800} />
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">DSA Problems Solved</p>
                 </motion.div>
                 
                 <motion.div 
                   whileHover={{ y: -5, scale: 1.02 }} 
                   className="p-6 rounded-2xl backdrop-blur-xl bg-slate-900/80 border border-white/15 hover:border-emerald-400/50 hover:bg-slate-900/95 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/5 relative z-20"
                 >
                    <h3 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                      <Counter target={2} suffix="x" duration={1000} />
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">Internship Experience</p>
                 </motion.div>
               </div>

               <div className="flex-1 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/5 relative z-20 overflow-hidden group flex flex-col justify-center">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-500" />
                  
                  <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <GraduationCap size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">Bachelor of Technology</h3>
                      <p className="text-cyan-400 font-medium text-base mb-3 leading-tight text-balance">Computer Science &amp; Engineering</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin size={14} className="text-gray-500" />
                          <span>Indian Institute of Information Technology, Ranchi</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar size={14} className="text-gray-500" />
                          <span>2023 — 2027</span>
                        </div>
                      </div>

                      <div className="mt-5 inline-block px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-0.5">CGPA</p>
                        <p className="text-lg font-bold text-white">8.38 / 10.0</p>
                      </div>
                    </div>
                  </div>
               </div>
               
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
