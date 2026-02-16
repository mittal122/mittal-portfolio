
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'MITTAL DOMADIYA';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);



  return (
    <>
      <Helmet>
        <title>Mittal Domadiya - DevOps Engineer | Cloud Architect | SRE Specialist</title>
        <meta name="description" content="Portfolio of Mittal Domadiya, a skilled DevOps Engineer specializing in cloud architecture, Kubernetes, Docker, and site reliability engineering." />
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">

          {/* Typewriter Heading */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 text-white"
            style={{ 
              textShadow: '0 0 40px rgba(150, 150, 150, 0.5), 0 0 80px rgba(150, 150, 150, 0.3)',
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              |
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm sm:text-base md:text-lg mb-12 font-light italic tracking-wide"
            style={{ 
              color: '#888888',
              letterSpacing: '0.05em'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            DevOps Engineer | Cloud Architect | SRE Specialist
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group text-sm md:text-base"
              style={{
                boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                letterSpacing: '0.1em'
              }}
            >
              <Sparkles className="group-hover:rotate-12 transition-transform" size={18} />
              GET IN TOUCH
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
