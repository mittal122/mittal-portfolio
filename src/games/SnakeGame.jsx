import React, { useState, useEffect, useRef, useCallback } from 'react';

const GRID = 15;
const accent = '#CF9EFF';
const START = [{ x: 7, y: 7 }];
const DIRS = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };

const randFood = (snake) => {
  let f;
  do { f = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }; }
  while (snake.some((s) => s.x === f.x && s.y === f.y));
  return f;
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(START);
  const [food, setFood] = useState(() => randFood(START));
  const [dir, setDir] = useState('right');
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('snake_best') || 0));
  const dirRef = useRef(dir);
  const queued = useRef(null);
  const touch = useRef(null);

  const setDirection = useCallback((nd) => {
    const cur = dirRef.current;
    const opposite = { up: 'down', down: 'up', left: 'right', right: 'left' };
    if (nd === opposite[cur] || nd === cur) return;
    queued.current = nd;
    if (!running && !over) setRunning(true);
  }, [running, over]);

  useEffect(() => {
    const onKey = (e) => {
      const m = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }[e.key];
      if (m) { e.preventDefault(); setDirection(m); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setDirection]);

  useEffect(() => {
    if (!running) return;
    const speed = Math.max(80, 150 - score * 3);
    const id = setInterval(() => {
      setSnake((prev) => {
        const d = queued.current || dirRef.current;
        dirRef.current = d; queued.current = null; setDir(d);
        const head = { x: prev[0].x + DIRS[d].x, y: prev[0].y + DIRS[d].y };
        if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID || prev.some((s) => s.x === head.x && s.y === head.y)) {
          setRunning(false); setOver(true);
          setBest((b) => { const nb = Math.max(b, score); localStorage.setItem('snake_best', String(nb)); return nb; });
          return prev;
        }
        const next = [head, ...prev];
        if (head.x === food.x && head.y === food.y) { setScore((s) => s + 1); setFood(randFood(next)); }
        else next.pop();
        return next;
      });
    }, speed);
    return () => clearInterval(id);
  }, [running, food, score]);

  const reset = () => {
    setSnake(START); setFood(randFood(START)); setDir('right'); dirRef.current = 'right';
    queued.current = null; setScore(0); setOver(false); setRunning(false);
  };

  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x, dy = t.clientY - touch.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
    if (Math.abs(dx) > Math.abs(dy)) setDirection(dx > 0 ? 'right' : 'left');
    else setDirection(dy > 0 ? 'down' : 'up');
    touch.current = null;
  };

  const cells = [];
  for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
    const isHead = snake[0].x === x && snake[0].y === y;
    const isBody = !isHead && snake.some((s) => s.x === x && s.y === y);
    const isFood = food.x === x && food.y === y;
    cells.push(
      <div key={`${x}-${y}`} style={{
        background: isHead ? accent : isBody ? 'rgba(207,158,255,0.55)' : isFood ? '#4ade80' : 'rgba(255,255,255,0.03)',
        borderRadius: isFood ? '50%' : '3px',
        boxShadow: isHead ? '0 0 8px rgba(207,158,255,0.7)' : isFood ? '0 0 8px rgba(74,222,128,0.7)' : 'none',
      }} />
    );
  }

  const DPad = ({ d, label, style }) => (
    <button onTouchStart={(e) => { e.preventDefault(); setDirection(d); }} onClick={() => setDirection(d)}
      className="flex items-center justify-center rounded-lg text-lg font-bold active:scale-90 transition"
      style={{ width: 48, height: 48, color: accent, background: 'rgba(207,158,255,0.08)', border: '1px solid rgba(207,158,255,0.25)', ...style }}>
      {label}
    </button>
  );

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center justify-between w-full max-w-[300px] mb-4">
        <div className="flex gap-2">
          {[['SCORE', score], ['BEST', best]].map(([l, v]) => (
            <div key={l} className="px-3 py-1.5 rounded-lg text-center" style={{ background: 'rgba(207,158,255,0.08)', border: '1px solid rgba(207,158,255,0.15)' }}>
              <div className="text-[9px] font-mono tracking-widest" style={{ color: accent }}>{l}</div>
              <div className="text-white font-bold text-sm tabular-nums">{v}</div>
            </div>
          ))}
        </div>
        <button onClick={reset} className="px-4 py-2 text-xs font-semibold rounded-lg active:scale-95 transition"
          style={{ color: accent, background: 'rgba(207,158,255,0.1)', border: '1px solid rgba(207,158,255,0.3)' }}>Restart</button>
      </div>

      <div className="relative rounded-xl p-2 touch-none" style={{ background: 'rgba(207,158,255,0.05)', border: '1px solid rgba(207,158,255,0.12)' }}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)`, width: 'min(78vw, 300px)', height: 'min(78vw, 300px)' }}>
          {cells}
        </div>
        {!running && !over && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl" style={{ background: 'rgba(6,0,16,0.7)' }}>
            <button onClick={() => setRunning(true)} className="px-6 py-2.5 text-sm font-bold rounded-lg" style={{ color: '#0a0a0a', background: accent }}>▶ Start</button>
            <p className="mt-3 text-xs text-white/40">Swipe / arrows / D-pad</p>
          </div>
        )}
        {over && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm" style={{ background: 'rgba(6,0,16,0.82)' }}>
            <div className="text-2xl font-black mb-1" style={{ color: accent }}>Game Over</div>
            <div className="text-white/60 text-sm mb-4">Score: {score}</div>
            <button onClick={reset} className="px-5 py-2 text-sm font-semibold rounded-lg" style={{ color: '#0a0a0a', background: accent }}>Play again</button>
          </div>
        )}
      </div>

      {/* On-screen D-pad (mobile) */}
      <div className="grid grid-cols-3 gap-2 mt-5 sm:hidden" style={{ width: 160 }}>
        <div /><DPad d="up" label="▲" /><div />
        <DPad d="left" label="◀" /><div /><DPad d="right" label="▶" />
        <div /><DPad d="down" label="▼" /><div />
      </div>
    </div>
  );
};

export default SnakeGame;
