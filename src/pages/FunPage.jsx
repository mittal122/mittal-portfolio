
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

const FunPage = () => {
  return (
    <>
      <Helmet>
        <title>Fun Zone - Mittal Domadiya</title>
        <meta name="description" content="Play fun mini-games and interactive experiences." />
      </Helmet>

      <div className="min-h-screen pt-[7.25rem] md:pt-[7.75rem] lg:pt-[8.5rem] pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-[2px] mx-auto mb-6"
              style={{ background: 'linear-gradient(90deg, transparent, #CF9EFF, transparent)' }}
            />
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white"
              style={{ textShadow: '0 0 50px rgba(207,158,255,0.4), 0 0 100px rgba(207,158,255,0.15)' }}
            >
              Fun Zone
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(207,158,255,0.5)' }}>
              Take a break and enjoy some mini-games & interactive experiences.
            </p>
          </motion.div>

          {/* Coming Soon Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-24"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-28 flex items-center justify-center rounded-2xl mb-10"
              style={{
                background: 'rgba(207,158,255,0.06)',
                border: '1px solid rgba(207,158,255,0.15)',
                boxShadow: '0 0 40px rgba(207,158,255,0.1)',
              }}
            >
              <Gamepad2 size={48} style={{ color: '#CF9EFF' }} />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">Games Coming Soon</h2>
            <p className="text-lg max-w-md text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Exciting mini-games and interactive experiences are being crafted. Stay tuned!
            </p>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-10">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#CF9EFF' }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FunPage;
