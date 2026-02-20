
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import GlassSurface from './GlassSurface';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const leftNavItems = [
    { path: '/', label: 'Home' },
    { path: '/experience', label: 'Experience' },
    { path: '/skills', label: 'Skills' },
  ];

  const rightNavItems = [
    { path: '/certifications', label: 'Certifications' },
    { path: '/fun', label: 'Fun' },
    { path: '/contact', label: 'Contact' },
  ];

  const allNavItems = [...leftNavItems, ...rightNavItems];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    let prevScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolling down or up
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setHidden(true);
      } else if (currentScrollY < prevScrollY || currentScrollY < 50) {
        // Scrolling up or near top - show navbar
        setHidden(false);
      }
      
      setScrolled(currentScrollY > 20);
      prevScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
      style={{ paddingTop: '1.5rem' }}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Main GlassSurface Background */}
        <motion.div
          animate={{ 
            opacity: hidden && !isHovered ? 0 : 1,
            scaleY: hidden && !isHovered ? 0.6 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'top' }}
          className="absolute inset-0"
        >
          <GlassSurface
            height="100%"
            borderRadius={50}
            brightness={30}
            opacity={0.95}
            blur={5}
            displace={2.5}
            backgroundOpacity={0.4}
            saturation={1.8}
            distortionScale={-250}
            redOffset={10}
            greenOffset={20}
            blueOffset={30}
            mixBlendMode="screen"
            className="w-full h-full"
          >
            <div className="w-full h-full" />
          </GlassSurface>
        </motion.div>
        
        {/* Logo Background Bar (visible when hidden) */}
        <motion.div
          className="absolute top-0 h-16"
          animate={{ 
            opacity: hidden && !isHovered ? 1 : 0,
            width: hidden && !isHovered ? '240px' : '100%',
            left: hidden && !isHovered ? '46%' : '0',
            right: hidden && !isHovered ? 'auto' : '0',
            transform: hidden && !isHovered ? 'translateX(-40%)' : 'translateX(0)',
          }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: 5 }}
        >
          <GlassSurface
            height="100%"
            borderRadius={50}
            brightness={30}
            opacity={0.95}
            blur={5}
            displace={2.5}
            backgroundOpacity={0.4}
            saturation={1.8}
            distortionScale={-250}
            redOffset={10}
            greenOffset={20}
            blueOffset={30}
            mixBlendMode="screen"
            className="w-full h-full"
          >
            <div className="w-full h-full" />
          </GlassSurface>
        </motion.div>
        
        <div className="relative flex items-center justify-between h-16 px-8" style={{ zIndex: 10 }}>
          {/* Left Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-3 relative z-10"
            animate={{ 
              opacity: hidden && !isHovered ? 0 : 1,
              pointerEvents: hidden && !isHovered ? 'none' : 'auto'
            }}
            transition={{ duration: 0.3 }}
          >
            {leftNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="cursor-target relative px-7 py-3.5 group cursor-pointer"
              >
                <span className={`relative z-10 text-base font-semibold tracking-wider transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                  isActive(item.path) 
                    ? 'text-white' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                
                {/* Hover Effect Background with Glassmorphism */}
                <div
                  className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'rgba(207,158,255,0.08)',
                    border: '1px solid rgba(207,158,255,0.15)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(207,158,255,0.15)'
                  }}
                />

                {/* Active Indicator */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 backdrop-blur-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      background: 'rgba(207,158,255,0.12)',
                      border: '1px solid rgba(207,158,255,0.25)',
                      boxShadow: '0 0 20px rgba(207,158,255,0.2), inset 0 1px 1px 0 rgba(207,158,255,0.2)'
                    }}
                  />
                )}
              </Link>
            ))}
          </motion.div>

          {/* Logo - Center */}
          <Link to="/" className="cursor-target cursor-pointer flex items-center relative z-20">
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

          {/* Right Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-3 relative z-10"
            animate={{ 
              opacity: hidden && !isHovered ? 0 : 1,
              pointerEvents: hidden && !isHovered ? 'none' : 'auto'
            }}
            transition={{ duration: 0.3 }}
          >
            {rightNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="cursor-target relative px-7 py-3.5 group cursor-pointer"
              >
                <span className={`relative z-10 text-base font-semibold tracking-wider transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                  isActive(item.path) 
                    ? 'text-white' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                
                {/* Hover Effect Background with Glassmorphism */}
                <div
                  className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'rgba(207,158,255,0.08)',
                    border: '1px solid rgba(207,158,255,0.15)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(207,158,255,0.15)'
                  }}
                />

                {/* Active Indicator */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 backdrop-blur-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      background: 'rgba(207,158,255,0.12)',
                      border: '1px solid rgba(207,158,255,0.25)',
                      boxShadow: '0 0 20px rgba(207,158,255,0.2), inset 0 1px 1px 0 rgba(207,158,255,0.2)'
                    }}
                  />
                )}
              </Link>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            animate={{ 
              opacity: hidden && !isHovered ? 0 : 1,
              pointerEvents: hidden && !isHovered ? 'none' : 'auto'
            }}
            transition={{ duration: 0.3 }}
            className="cursor-target md:hidden p-2.5 text-white transition-all duration-300 cursor-pointer relative z-10 backdrop-blur-sm"
            style={{
              background: 'rgba(207,158,255,0.06)',
              border: '1px solid rgba(207,158,255,0.15)',
              boxShadow: '0 2px 8px rgba(207,158,255,0.08), inset 0 1px 1px 0 rgba(207,158,255,0.1)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-w-6xl mx-auto mt-3 overflow-hidden relative"
          >
            <GlassSurface
              borderRadius={24}
              brightness={30}
              opacity={0.95}
              blur={5}
              displace={2.5}
              backgroundOpacity={0.4}
              saturation={1.8}
              distortionScale={-250}
              redOffset={10}
              greenOffset={20}
              blueOffset={30}
              mixBlendMode="screen"
              className="w-full"
            >
              <div className="px-4 py-6 space-y-2 w-full">
                {allNavItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-5 py-3.5 text-base font-semibold tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                        isActive(item.path)
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      style={{
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                        background: isActive(item.path) ? 'rgba(207,158,255,0.12)' : 'transparent',
                        border: isActive(item.path) ? '1px solid rgba(207,158,255,0.25)' : '1px solid rgba(207,158,255,0.08)',
                        boxShadow: isActive(item.path) 
                          ? 'inset 0 1px 1px 0 rgba(207,158,255,0.2), 0 4px 12px rgba(207,158,255,0.08)'
                          : 'inset 0 1px 1px 0 rgba(207,158,255,0.05)'
                      }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
