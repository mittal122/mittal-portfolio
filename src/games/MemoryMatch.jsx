import React, { useState, useEffect, useRef } from 'react';

const accent = '#CF9EFF';
const ICONS = ['🚀', '☁️', '⚙️', '🐳', '🔒', '⚡', '🛰️', '🧠'];

const build = () => {
  const deck = [...ICONS, ...ICONS]
    .map((icon, i) => ({ id: i, icon }))
    .sort(() => Math.random() - 0.5);
  return deck;
};

const MemoryMatch = () => {
  const [cards, setCards] = useState(build);
  const [flipped, setFlipped] = useState([]); // indices currently face-up (unmatched)
  const [matched, setMatched] = useState([]); // matched icon values
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const lock = useRef(false);
  const won = matched.length === ICONS.length;

  useEffect(() => {
    if (!started || won) return;
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [started, won]);

  const flip = (i) => {
    if (lock.current || flipped.includes(i) || matched.includes(cards[i].icon)) return;
    if (!started) setStarted(true);
    const nf = [...flipped, i];
    setFlipped(nf);
    if (nf.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nf;
      if (cards[a].icon === cards[b].icon) {
        setMatched((prev) => [...prev, cards[a].icon]);
        setFlipped([]);
      } else {
        lock.current = true;
        setTimeout(() => { setFlipped([]); lock.current = false; }, 750);
      }
    }
  };

  const reset = () => {
    setCards(build()); setFlipped([]); setMatched([]); setMoves(0); setTime(0); setStarted(false); lock.current = false;
  };

  const mm = String(Math.floor(time / 60)).padStart(2, '0');
  const ss = String(time % 60).padStart(2, '0');

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center justify-between w-full max-w-[320px] mb-4">
        <div className="flex gap-2">
          {[['MOVES', moves], ['TIME', `${mm}:${ss}`], ['PAIRS', `${matched.length}/${ICONS.length}`]].map(([l, v]) => (
            <div key={l} className="px-2.5 py-1.5 rounded-lg text-center" style={{ background: 'rgba(207,158,255,0.08)', border: '1px solid rgba(207,158,255,0.15)' }}>
              <div className="text-[9px] font-mono tracking-widest" style={{ color: accent }}>{l}</div>
              <div className="text-white font-bold text-sm tabular-nums">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-4 gap-2">
        {cards.map((card, i) => {
          const show = flipped.includes(i) || matched.includes(card.icon);
          return (
            <button key={card.id} onClick={() => flip(i)}
              className="flex items-center justify-center rounded-xl transition active:scale-95"
              style={{
                width: 'min(19vw, 72px)', height: 'min(19vw, 72px)', fontSize: '1.9rem',
                background: show ? 'rgba(207,158,255,0.14)' : 'rgba(207,158,255,0.04)',
                border: `1px solid rgba(207,158,255,${show ? '0.35' : '0.12'})`,
                boxShadow: matched.includes(card.icon) ? '0 0 14px rgba(207,158,255,0.3)' : 'none',
                transform: show ? 'rotateY(0deg)' : 'rotateY(0deg)',
                opacity: matched.includes(card.icon) ? 0.75 : 1,
              }}>
              {show ? card.icon : ''}
            </button>
          );
        })}
        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm" style={{ background: 'rgba(6,0,16,0.85)' }}>
            <div className="text-2xl font-black mb-1" style={{ color: accent }}>Solved! 🎉</div>
            <div className="text-white/60 text-sm mb-4">{moves} moves · {mm}:{ss}</div>
            <button onClick={reset} className="px-5 py-2 text-sm font-semibold rounded-lg" style={{ color: '#0a0a0a', background: accent }}>Play again</button>
          </div>
        )}
      </div>

      <button onClick={reset} className="mt-5 px-5 py-2 text-sm font-semibold rounded-lg active:scale-95 transition"
        style={{ color: accent, background: 'rgba(207,158,255,0.1)', border: '1px solid rgba(207,158,255,0.3)' }}>Shuffle & restart</button>
      <p className="mt-3 text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>Flip two cards to find matching pairs.</p>
    </div>
  );
};

export default MemoryMatch;
