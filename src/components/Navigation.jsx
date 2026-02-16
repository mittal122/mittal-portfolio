
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/skills', label: 'Skills' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Glassmorphism Background with Specular Highlights */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.05] backdrop-blur-3xl" 
          style={{
            boxShadow: `
              0 8px 32px 0 rgba(255, 255, 255, 0.1),
              inset 0 1px 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1)
            `
          }}
        />
        
        {/* Thin Semi-transparent Border */}
        <div className="absolute inset-0 rounded-full border border-white/20" 
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
            WebkitMaskImage: 'linear-gradient(black, black)',
            maskImage: 'linear-gradient(black, black)',
          }}
        />
        
        {/* Corner Highlights */}
        <div className="absolute top-0 left-8 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute top-0 right-8 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
        
        <div className="relative flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="cursor-pointer flex items-center relative z-10">
            <motion.img 
              src="https://horizons-cdn.hostinger.com/cefdf522-75c3-48d6-8c09-370295405681/3cd355b3f9ce8b4bbf3d0f61081cf805.png"
              alt="Mittal Domadiya Logo"
              className="h-[30px] md:h-[35px] w-auto drop-shadow-[0_2px_8px_rgba(255,255,255,0.4)]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ 
                scale: 1.1,
                filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.9))"
              }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 relative z-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-5 py-2.5 group cursor-pointer"
              >
                <span className={`relative z-10 text-sm font-semibold tracking-wider transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                  isActive(item.path) 
                    ? 'text-white' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                
                {/* Hover Effect Background with Glassmorphism */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20"
                  layoutId="hoverBackground"
                  style={{
                    boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                />

                {/* Active Indicator */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-white/15 backdrop-blur-sm border border-white/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3)'
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 text-white hover:bg-white/10 rounded-full transition-all duration-300 cursor-pointer relative z-10 border border-white/20 backdrop-blur-sm"
            style={{
              boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-w-6xl mx-auto mt-3 rounded-3xl overflow-hidden relative"
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.15] via-white/[0.08] to-white/[0.05] backdrop-blur-3xl"
              style={{
                boxShadow: `
                  0 8px 32px 0 rgba(255, 255, 255, 0.1),
                  inset 0 1px 1px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1)
                `
              }}
            />
            
            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/20" />
            
            {/* Corner Highlights */}
            <div className="absolute top-0 left-8 w-20 h-20 rounded-full bg-white/10 blur-xl" />
            <div className="absolute bottom-0 right-8 w-20 h-20 rounded-full bg-white/10 blur-xl" />
            
            <div className="relative px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3.5 rounded-full text-base font-semibold tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                      isActive(item.path)
                        ? 'bg-white/15 text-white border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                    style={{
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                      boxShadow: isActive(item.path) 
                        ? 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(255, 255, 255, 0.1)'
                        : 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
