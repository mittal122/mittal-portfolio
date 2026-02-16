
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import BackToTopButton from '@/components/BackToTopButton';
import AnimatedBackground from '@/components/AnimatedBackground';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ExperiencePage from '@/pages/ExperiencePage';
import SkillsPage from '@/pages/SkillsPage';
import CertificationsPage from '@/pages/CertificationsPage';
import ContactPage from '@/pages/ContactPage';

console.log('App.jsx is loading...');

function App() {
  console.log('App component is rendering...');
  
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a]">
        <ScrollProgressBar />
        <Navigation />
        
        <AnimatedBackground>
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
                path="/about"
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AboutPage />
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
        </AnimatedBackground>

        <BackToTopButton />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
