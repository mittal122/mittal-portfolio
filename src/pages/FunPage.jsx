import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import TrueFocus from '@/components/TrueFocus';
import Game2048 from '@/games/Game2048';
import SnakeGame from '@/games/SnakeGame';
import TicTacToe from '@/games/TicTacToe';
import MemoryMatch from '@/games/MemoryMatch';
import RockPaperScissors from '@/games/RockPaperScissors';

const accent = '#CF9EFF';
const accentDim = 'rgba(207,158,255,';

const GAMES = [
  { id: '2048', name: '2048', emoji: '🔢', tagline: 'Slide and merge tiles to reach 2048.', Comp: Game2048 },
  { id: 'snake', name: 'Snake', emoji: '🐍', tagline: 'Eat, grow, and avoid your own tail.', Comp: SnakeGame },
  { id: 'ttt', name: 'Tic-Tac-Toe', emoji: '⭕', tagline: 'Beat (or draw) an unbeatable AI.', Comp: TicTacToe },
  { id: 'memory', name: 'Memory Match', emoji: '🧩', tagline: 'Flip cards and find every pair.', Comp: MemoryMatch },
  { id: 'rps', name: 'Rock Paper Scissors', emoji: '✂️', tagline: 'Best the computer, one throw at a time.', Comp: RockPaperScissors },
];

const FunPage = () => {
  const [active, setActive] = useState(null);
  const game = GAMES.find((g) => g.id === active);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [active]);

  return (
    <>
      <Helmet>
        <title>Fun Zone - Mittal Domadiya</title>
        <meta name="description" content="Play free mini-games: 2048, Snake, Tic-Tac-Toe, Memory Match, and Rock Paper Scissors." />
      </Helmet>

      <div className="min-h-screen pt-[7.25rem] md:pt-[7.75rem] lg:pt-[8.5rem] pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-[2px] mx-auto mb-6"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />
            <div className="mb-6">
              <TrueFocus
                sentence="Fun Zone"
                manualMode={false}
                blurAmount={5}
                borderColor="#CF9EFF"
                glowColor="rgba(207, 158, 255, 0.6)"
                animationDuration={0.5}
                pauseBetweenAnimations={1}
                className="text-5xl sm:text-6xl md:text-7xl font-black text-white"
                textStyle={{ textShadow: '0 0 50px rgba(207,158,255,0.4), 0 0 100px rgba(207,158,255,0.15)' }}
              />
            </div>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: `${accentDim}0.5)` }}>
              Need a break? Pick a game — all playable right here, on desktop or phone.
            </p>
          </motion.div>

          {/* Game cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.map((g, index) => (
              <motion.button
                key={g.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setActive(g.id)}
                className="cursor-target group relative text-left p-7 overflow-hidden transition-all"
                style={{
                  background: `${accentDim}0.04)`,
                  border: `1px solid ${accentDim}0.12)`,
                  borderRadius: '18px',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${accentDim}0.12) 0%, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div className="text-5xl mb-5">{g.emoji}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#CF9EFF] transition-colors">{g.name}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>{g.tagline}</p>
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg"
                    style={{ color: accent, background: `${accentDim}0.08)`, border: `1px solid ${accentDim}0.25)` }}
                  >
                    ▶ Play
                  </span>
                </div>
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Game modal */}
      <AnimatePresence>
        {game && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(6,0,16,0.8)', backdropFilter: 'blur(10px)' }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 pt-14"
              style={{
                background: 'linear-gradient(180deg, rgba(20,10,35,0.98) 0%, #060010 100%)',
                border: `1px solid ${accentDim}0.25)`,
                borderRadius: '22px',
                boxShadow: `0 0 60px ${accentDim}0.15)`,
              }}
            >
              {/* Modal header */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3"
                style={{ borderBottom: `1px solid ${accentDim}0.12)` }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{game.emoji}</span>
                  <span className="font-bold text-white">{game.name}</span>
                </div>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close game"
                  className="cursor-target flex items-center justify-center w-9 h-9 rounded-lg transition active:scale-90"
                  style={{ color: accent, background: `${accentDim}0.08)`, border: `1px solid ${accentDim}0.2)` }}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="pt-2">
                <game.Comp />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FunPage;
