import React, { useState } from 'react';

const accent = '#CF9EFF';
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const winner = (b) => {
  for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
  return null;
};

// minimax — AI is 'O', player 'X'. Returns best score for 'O'.
const minimax = (b, isAI) => {
  const w = winner(b);
  if (w === 'O') return 10;
  if (w === 'X') return -10;
  if (b.every(Boolean)) return 0;
  const scores = [];
  b.forEach((cell, i) => {
    if (!cell) {
      const nb = [...b]; nb[i] = isAI ? 'O' : 'X';
      scores.push(minimax(nb, !isAI));
    }
  });
  return isAI ? Math.max(...scores) : Math.min(...scores);
};

const bestMove = (b) => {
  let best = -Infinity, move = -1;
  b.forEach((cell, i) => {
    if (!cell) {
      const nb = [...b]; nb[i] = 'O';
      const s = minimax(nb, false);
      if (s > best) { best = s; move = i; }
    }
  });
  return move;
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [lock, setLock] = useState(false);
  const [tally, setTally] = useState({ w: 0, l: 0, d: 0 });
  const win = winner(board);
  const full = board.every(Boolean);
  const done = win || full;

  const finish = (result) => {
    setTally((t) => ({ ...t, [result]: t[result] + 1 }));
  };

  const play = (i) => {
    if (board[i] || done || lock) return;
    const nb = [...board]; nb[i] = 'X';
    setBoard(nb);
    const pw = winner(nb);
    if (pw === 'X') { finish('w'); return; }
    if (nb.every(Boolean)) { finish('d'); return; }
    setLock(true);
    setTimeout(() => {
      const m = bestMove(nb);
      if (m >= 0) nb[m] = 'O';
      setBoard([...nb]);
      const aw = winner(nb);
      if (aw === 'O') finish('l');
      else if (nb.every(Boolean)) finish('d');
      setLock(false);
    }, 350);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setLock(false); };

  const status = win === 'X' ? 'You win! 🎉' : win === 'O' ? 'AI wins' : full ? "It's a draw" : lock ? 'AI thinking…' : 'Your turn (X)';

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex gap-2 mb-4">
        {[['WON', tally.w], ['LOST', tally.l], ['DRAW', tally.d]].map(([l, v]) => (
          <div key={l} className="px-3 py-1.5 rounded-lg text-center" style={{ background: 'rgba(207,158,255,0.08)', border: '1px solid rgba(207,158,255,0.15)' }}>
            <div className="text-[9px] font-mono tracking-widest" style={{ color: accent }}>{l}</div>
            <div className="text-white font-bold text-sm tabular-nums">{v}</div>
          </div>
        ))}
      </div>

      <div className="text-sm font-semibold mb-4 h-5" style={{ color: accent }}>{status}</div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button key={i} onClick={() => play(i)} disabled={!!cell || done || lock}
            className="flex items-center justify-center rounded-xl font-black transition active:scale-95"
            style={{
              width: 'min(26vw, 96px)', height: 'min(26vw, 96px)', fontSize: '2.5rem',
              background: 'rgba(207,158,255,0.05)',
              border: `1px solid rgba(207,158,255,${cell ? '0.3' : '0.12'})`,
              color: cell === 'X' ? accent : '#4ade80',
              textShadow: cell ? `0 0 14px ${cell === 'X' ? 'rgba(207,158,255,0.6)' : 'rgba(74,222,128,0.6)'}` : 'none',
              cursor: cell || done || lock ? 'default' : 'pointer',
            }}>
            {cell}
          </button>
        ))}
      </div>

      <button onClick={reset} className="mt-5 px-5 py-2 text-sm font-semibold rounded-lg active:scale-95 transition"
        style={{ color: done ? '#0a0a0a' : accent, background: done ? accent : 'rgba(207,158,255,0.1)', border: '1px solid rgba(207,158,255,0.3)' }}>
        {done ? 'Play again' : 'Reset board'}
      </button>
      <p className="mt-3 text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>You are X. The AI plays perfectly — can you force a draw?</p>
    </div>
  );
};

export default TicTacToe;
