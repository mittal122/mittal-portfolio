
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import TargetCursor from '@/components/TargetCursor';
import Noise from '@/components/Noise';
import Navigation from '@/components/Navigation';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTopButton from '@/components/BackToTopButton';

import HomePage from '@/pages/HomePage';
import ExperiencePage from '@/pages/ExperiencePage';
import SkillsPage from '@/pages/SkillsPage';
import CertificationsPage from '@/pages/CertificationsPage';
import ContactPage from '@/pages/ContactPage';
import FunPage from '@/pages/FunPage';

console.log('App.jsx is loading...');

function App() {
  console.log('App component is rendering...');
  
  return (
    <Router>
      <div className="min-h-screen bg-[#060010] relative overflow-hidden">
        <Noise
          patternSize={250}
          patternScaleX={2}
          patternScaleY={2}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor
          parallaxOn
          hoverDuration={0.2}
        />
        <ScrollProgressBar />
        <Navigation />
        
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HomePage />
                  </motion.div>
                }
              />
              <Route
                path="/experience"
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ExperiencePage />
                  </motion.div>
                }
              />
              <Route
                path="/skills"
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SkillsPage />
                  </motion.div>
                }
              />
              <Route
                path="/certifications"
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CertificationsPage />
                  </motion.div>
                }
              />
              <Route
                path="/fun"
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FunPage />
                  </motion.div>
                }
              />
              <Route
                path="/contact"
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ContactPage />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>

        <BackToTopButton />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
