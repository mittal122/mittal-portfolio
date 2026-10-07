import { useId } from 'react';

// Line-drawn mechanism of each featured project, taken from its README facts.
// Lilac strokes; the one ember mark is where the human / deterministic core sits.
const T = { fill: 'currentColor', fontFamily: 'Martian Mono, ui-monospace, monospace', fontSize: 8, letterSpacing: '0' };
const S = { fill: 'none', stroke: '#7C7EF8', strokeWidth: 1.25, vectorEffect: 'non-scaling-stroke' };

function Helmsman({ arrow }) {
  const steps = ['BUILD', 'YAML', 'SCAN', 'DEPLOY', 'VERIFY'];
  return (
    <>
      {steps.map((s, i) => {
        const x = 12 + i * 46;
        return (
          <g key={s}>
            <rect x={x} y={44} width={34} height={22} {...S} stroke={i === 3 ? '#FF6B3D' : S.stroke} />
            <text x={x + 17} y={80} textAnchor="middle" {...T}>{s}</text>
            {i < steps.length - 1 && <path d={`M${x + 34} 55 h12`} {...S} markerEnd={arrow} />}
          </g>
        );
      })}
      {/* self-heal returns from verify to deploy */}
      <path d="M213 44 C213 18 167 18 167 42" {...S} strokeDasharray="3 3" markerEnd={arrow} />
      <text x={190} y={14} textAnchor="middle" {...T}>SELF-HEAL</text>
      <text x={12} y={104} {...T} fill="#8F9BCB">LLM ADVISES · CORE APPLIES</text>
    </>
  );
}

function AutoSRE() {
  const steps = ['DETECT', 'DIAGNOSE', 'DECIDE', 'REMEDIATE', 'VERIFY'];
  const cx = 120, cy = 50, R = 33;
  const pts = steps.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / steps.length;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a), a];
  });
  return (
    <>
      <circle cx={cx} cy={cy} r={R} {...S} strokeDasharray="2 4" />
      {pts.map(([x, y, a], i) => (
        <g key={steps[i]}>
          <circle cx={x} cy={y} r={4} fill="#090B18" {...S} stroke={i === 3 ? '#FF6B3D' : S.stroke} />
          <text
            x={x + Math.cos(a) * 12}
            y={y + Math.sin(a) * 12 + 3}
            textAnchor={Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end'}
            {...T}
          >
            {steps[i]}
          </text>
        </g>
      ))}
      <text x={cx} y={cy + 3} textAnchor="middle" {...T} fill="#8F9BCB">GITOPS</text>
      <path d="M12 113 h14" {...S} stroke="#FF6B3D" />
      <text x={32} y={116} {...T} fill="#8F9BCB">ESCALATE TO HUMAN</text>
    </>
  );
}

function CloudScope() {
  const layers = ['NETWORKING', 'COMPUTE', 'DATA'];
  return (
    <>
      {layers.map((l, i) => {
        const y = 22 + i * 28;
        return (
          <g key={l}>
            <path d={`M74 ${y + 12} L118 ${y} L162 ${y + 12} L118 ${y + 24} Z`} {...S} stroke={i === 1 ? '#FF6B3D' : S.stroke} />
            <text x={168} y={y + 15} {...T}>{l}</text>
          </g>
        );
      })}
      <path d="M40 22 v80" {...S} strokeDasharray="2 3" />
      <text x={36} y={18} textAnchor="middle" {...T} fill="#8F9BCB">AWS</text>
      <text x={20} y={112} {...T} fill="#8F9BCB">TELEMETRY → MAP → HCL</text>
    </>
  );
}

const DRAWINGS = { helmsman: Helmsman, autosre: AutoSRE, cloudscope: CloudScope };
const ALT = {
  helmsman: 'Pipeline: build, generate YAML, scan, deploy, verify, with a self-heal loop back to deploy. The LLM advises; the deterministic core applies.',
  autosre: 'Control loop: detect, diagnose, decide, remediate, verify, run through GitOps, escalating to a human when it cannot fix the issue.',
  cloudscope: 'AWS telemetry organised into networking, compute and data layers, exported back out as Terraform HCL.',
};

// `reveal`: the drawing is wiped on left to right like a plotter pass (CSS, see .diagram-wipe).
export default function Diagram({ slug, className = '', reveal = false }) {
  const id = useId().replace(/:/g, '');
  const Drawing = DRAWINGS[slug];
  if (!Drawing) return null;
  return (
    <svg viewBox="0 0 240 120" role="img" aria-label={ALT[slug]} className={`text-mist ${className}`}>
      <defs>
        <marker id={`arr${id}`} viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#7C7EF8" />
        </marker>
        {reveal && (
          <clipPath id={`wipe${id}`}>
            <rect x="0" y="0" width="240" height="120" className="diagram-wipe" />
          </clipPath>
        )}
      </defs>
      <g clipPath={reveal ? `url(#wipe${id})` : undefined}>
        <Drawing arrow={`url(#arr${id})`} />
      </g>
    </svg>
  );
}
