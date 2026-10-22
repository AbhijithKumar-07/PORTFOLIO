import React, { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import About from './components/About'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import NeuralBackground from './components/NeuralBackground'
import Navbar from './components/Navbar'
import Experience from './components/Experience'
import ContestRatings from './components/ContestRatings'
import { useContestData } from './hooks/useContestData'

const App = () => {
  const contestData = useContestData();

  // Restore current section on page reload instantly without stutter or delay
  useEffect(() => {
    const saved = sessionStorage.getItem('portfolio_active_section');
    const hash = window.location.hash;
    const targetId = (hash ? hash.replace('#', '') : '') || (saved && saved !== 'home' ? saved : '');

    if (targetId && targetId !== 'home') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }
    document.documentElement.classList.add('smooth-scroll');
  }, []);

  // Silently pre-warm Render deployed projects in background
  useEffect(() => {
    const warmUrls = [
      'https://chat-app-iuwc.onrender.com/',
      'https://realtime-device-tracker-2mf2.onrender.com/',
      'https://food-delivery-frontend-7lf2.onrender.com/',
      'https://code-sync-frontend-7a09.onrender.com/'
    ];

    // Trigger after initial render to avoid affecting site loading performance
    const timer = setTimeout(() => {
      warmUrls.forEach((url) => {
        try {
          fetch(url, { mode: 'no-cors', cache: 'no-cache' }).catch(() => {
            // Silently swallow errors; purpose is simply to trigger Render's incoming HTTP request
          });
        } catch (e) {
          // ignore
        }
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen px-3 sm:px-6 md:px-16 lg:px-20 py-10 relative z-0 transition-colors duration-400'
      style={{ color: 'var(--text-primary)' }}
    >
      <NeuralBackground />
      <Navbar />
      <Hero contestData={contestData} />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <ContestRatings contestData={contestData} />
      <Contact />
      <Analytics />
    </div>
  )
}

export default App
