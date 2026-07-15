import React, { useState, useEffect, useCallback, useRef } from 'react';

const SIZE = 4;
const accent = '#CF9EFF';

const emptyGrid = () => Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

const addRandom = (grid) => {
  const empty = [];
  grid.forEach((row, r) => row.forEach((v, c) => { if (v === 0) empty.push([r, c]); }));
  if (!empty.length) return grid;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return grid;
};

const clone = (g) => g.map((r) => [...r]);

// slide+merge one row to the left, return { row, gained }
const slideRow = (row) => {
  const nums = row.filter((v) => v !== 0);
  let gained = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] *= 2;
      gained += nums[i];
      nums.splice(i + 1, 1);
    }
  }
  while (nums.length < SIZE) nums.push(0);
  return { row: nums, gained };
};

const rotate = (g) => {
  const n = emptyGrid();
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) n[c][SIZE - 1 - r] = g[r][c];
  return n;
};

// move: 0=left,1=up,2=right,3=down
const move = (grid, dir) => {
  let g = clone(grid);
  for (let i = 0; i < dir; i++) g = rotate(g);
  let gained = 0;
  g = g.map((row) => { const s = slideRow(row); gained += s.gained; return s.row; });
  for (let i = 0; i < (4 - dir) % 4; i++) g = rotate(g);
  return { grid: g, gained };
};

const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const hasMoves = (grid) => {
  for (let d = 0; d < 4; d++) if (!equal(move(grid, d).grid, grid)) return true;
  return false;
};

const tileColor = (v) => {
  const map = {
    2: 'rgba(207,158,255,0.10)', 4: 'rgba(207,158,255,0.18)', 8: 'rgba(207,158,255,0.28)',
    16: 'rgba(207,158,255,0.40)', 32: 'rgba(155,89,182,0.55)', 64: 'rgba(155,89,182,0.70)',
    128: 'rgba(126,87,194,0.80)', 256: 'rgba(126,87,194,0.90)', 512: '#7E57C2',
    1024: '#9B59B6', 2048: '#CF9EFF',
  };
  return map[v] || '#CF9EFF';
};

const Game2048 = () => {
  const [grid, setGrid] = useState(() => addRandom(addRandom(emptyGrid())));
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('g2048_best') || 0));
  const [over, setOver] = useState(false);
  const [won, setWon] = useState(false);
  const touch = useRef(null);

  const doMove = useCallback((dir) => {
    if (over) return;
    setGrid((prev) => {
      const { grid: moved, gained } = move(prev, dir);
      if (equal(moved, prev)) return prev;
      addRandom(moved);
      if (gained) setScore((s) => {
        const ns = s + gained;
        if (ns > best) { setBest(ns); localStorage.setItem('g2048_best', String(ns)); }
        return ns;
      });
      if (!won && moved.flat().includes(2048)) setWon(true);
      if (!hasMoves(moved)) setOver(true);
      return moved;
    });
  }, [over, won, best]);

  useEffect(() => {
    const onKey = (e) => {
      const k = { ArrowLeft: 0, ArrowUp: 1, ArrowRight: 2, ArrowDown: 3 }[e.key];
      if (k !== undefined) { e.preventDefault(); doMove(k); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [doMove]);

  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x, dy = t.clientY - touch.current.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) doMove(dx > 0 ? 2 : 0);
    else doMove(dy > 0 ? 3 : 1);
    touch.current = null;
  };

  const reset = () => { setGrid(addRandom(addRandom(emptyGrid()))); setScore(0); setOver(false); setWon(false); };

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center justify-between w-full max-w-[320px] mb-4">
        <div className="flex gap-2">
          {[['SCORE', score], ['BEST', best]].map(([l, v]) => (
            <div key={l} className="px-3 py-1.5 rounded-lg text-center" style={{ background: 'rgba(207,158,255,0.08)', border: '1px solid rgba(207,158,255,0.15)' }}>
              <div className="text-[9px] font-mono tracking-widest" style={{ color: accent }}>{l}</div>
              <div className="text-white font-bold text-sm tabular-nums">{v}</div>
            </div>
          ))}
        </div>
        <button onClick={reset} className="px-4 py-2 text-xs font-semibold rounded-lg transition active:scale-95"
          style={{ color: accent, background: 'rgba(207,158,255,0.1)', border: '1px solid rgba(207,158,255,0.3)' }}>
          New Game
        </button>
      </div>

      <div
        className="relative p-2 rounded-xl touch-none"
        style={{ background: 'rgba(207,158,255,0.05)', border: '1px solid rgba(207,158,255,0.12)' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid grid-cols-4 gap-2">
          {grid.flat().map((v, i) => (
            <div key={i} className="flex items-center justify-center rounded-lg font-bold tabular-nums"
              style={{
                width: 'min(19vw, 72px)', height: 'min(19vw, 72px)',
                background: v ? tileColor(v) : 'rgba(255,255,255,0.03)',
                color: v <= 4 ? accent : '#fff',
                fontSize: v >= 1024 ? '1.05rem' : v >= 128 ? '1.25rem' : '1.5rem',
                boxShadow: v >= 32 ? '0 0 16px rgba(207,158,255,0.35)' : 'none',
                transition: 'background 0.12s',
              }}>
              {v || ''}
            </div>
          ))}
        </div>

        {(over || won) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm" style={{ background: 'rgba(6,0,16,0.82)' }}>
            <div className="text-2xl font-black mb-1" style={{ color: accent }}>{won && !over ? 'You hit 2048! 🎉' : 'Game Over'}</div>
            <div className="text-white/60 text-sm mb-4">Score: {score}</div>
            <div className="flex gap-3">
              <button onClick={reset} className="px-5 py-2 text-sm font-semibold rounded-lg" style={{ color: '#0a0a0a', background: accent }}>Play again</button>
              {won && !over && <button onClick={() => setWon(false)} className="px-5 py-2 text-sm font-semibold rounded-lg" style={{ color: accent, border: `1px solid ${accent}` }}>Keep going</button>}
            </div>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
        Swipe or use arrow keys to combine tiles.
      </p>
    </div>
  );
};

export default Game2048;
