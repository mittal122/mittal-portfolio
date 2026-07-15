import React, { useState } from 'react';

const accent = '#CF9EFF';
const MOVES = [
  { key: 'rock', emoji: '🪨', label: 'Rock' },
  { key: 'paper', emoji: '📄', label: 'Paper' },
  { key: 'scissors', emoji: '✂️', label: 'Scissors' },
];
const BEATS = { rock: 'scissors', paper: 'rock', scissors: 'paper' };

const RockPaperScissors = () => {
  const [you, setYou] = useState(null);
  const [cpu, setCpu] = useState(null);
  const [result, setResult] = useState(null); // 'win' | 'lose' | 'draw'
  const [tally, setTally] = useState({ win: 0, lose: 0, draw: 0 });
  const [rolling, setRolling] = useState(false);

  const play = (moveKey) => {
    if (rolling) return;
    setRolling(true);
    setResult(null);
    const yourMove = MOVES.find((m) => m.key === moveKey);
    setYou(yourMove);

    let ticks = 0;
    const spin = setInterval(() => {
      setCpu(MOVES[Math.floor(Math.random() * 3)]);
      ticks++;
      if (ticks > 8) {
        clearInterval(spin);
        const cpuMove = MOVES[Math.floor(Math.random() * 3)];
        setCpu(cpuMove);
        let r;
        if (cpuMove.key === yourMove.key) r = 'draw';
        else if (BEATS[yourMove.key] === cpuMove.key) r = 'win';
        else r = 'lose';
        setResult(r);
        setTally((t) => ({ ...t, [r]: t[r] + 1 }));
        setRolling(false);
      }
    }, 60);
  };

  const reset = () => { setYou(null); setCpu(null); setResult(null); setTally({ win: 0, lose: 0, draw: 0 }); };

  const msg = result === 'win' ? 'You win! 🎉' : result === 'lose' ? 'You lose' : result === 'draw' ? 'Draw' : rolling ? '…' : 'Pick your move';
  const msgColor = result === 'win' ? '#4ade80' : result === 'lose' ? '#f87171' : accent;

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex gap-2 mb-6">
        {[['WINS', tally.win], ['LOSSES', tally.lose], ['DRAWS', tally.draw]].map(([l, v]) => (
          <div key={l} className="px-3 py-1.5 rounded-lg text-center" style={{ background: 'rgba(207,158,255,0.08)', border: '1px solid rgba(207,158,255,0.15)' }}>
            <div className="text-[9px] font-mono tracking-widest" style={{ color: accent }}>{l}</div>
            <div className="text-white font-bold text-sm tabular-nums">{v}</div>
          </div>
        ))}
      </div>

      {/* Arena */}
      <div className="flex items-center justify-center gap-4 mb-2" style={{ height: 96 }}>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-2xl" style={{ width: 80, height: 80, fontSize: '2.5rem', background: 'rgba(207,158,255,0.06)', border: '1px solid rgba(207,158,255,0.2)' }}>
            {you ? you.emoji : '❔'}
          </div>
          <span className="text-[10px] font-mono" style={{ color: `rgba(207,158,255,0.5)` }}>YOU</span>
        </div>
        <span className="text-xl font-black" style={{ color: 'rgba(255,255,255,0.3)' }}>VS</span>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-2xl" style={{ width: 80, height: 80, fontSize: '2.5rem', background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)' }}>
            {cpu ? cpu.emoji : '❔'}
          </div>
          <span className="text-[10px] font-mono" style={{ color: 'rgba(74,222,128,0.5)' }}>CPU</span>
        </div>
      </div>

      <div className="text-lg font-black mb-5 h-7" style={{ color: msgColor }}>{msg}</div>

      {/* Move buttons */}
      <div className="flex gap-3">
        {MOVES.map((m) => (
          <button key={m.key} onClick={() => play(m.key)} disabled={rolling}
            className="flex flex-col items-center gap-1 rounded-2xl transition active:scale-90 hover:-translate-y-1"
            style={{
              width: 76, height: 88, background: 'rgba(207,158,255,0.06)',
              border: `1px solid rgba(207,158,255,${you?.key === m.key ? '0.4' : '0.15'})`,
              cursor: rolling ? 'default' : 'pointer',
            }}>
            <span style={{ fontSize: '2rem' }}>{m.emoji}</span>
            <span className="text-[10px] font-mono tracking-wide" style={{ color: accent }}>{m.label}</span>
          </button>
        ))}
      </div>

      <button onClick={reset} className="mt-6 px-5 py-2 text-sm font-semibold rounded-lg active:scale-95 transition"
        style={{ color: accent, background: 'rgba(207,158,255,0.1)', border: '1px solid rgba(207,158,255,0.3)' }}>Reset score</button>
    </div>
  );
};

export default RockPaperScissors;
