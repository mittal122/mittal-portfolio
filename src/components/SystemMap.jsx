import { useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '@/data/profile';

// The projects page's living map. Tools used by 2+ projects become hubs in the
// centre; projects ring them, wired ONLY to tools in their own stack, so every
// line on the map is a fact from src/data/profile.js, never an invented link.

const FEATURED_FIRST = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

export function buildGraph() {
  const count = {};
  projects.forEach((p) => p.stack.forEach((t) => { count[t] = (count[t] || 0) + 1; }));
  const hubs = Object.keys(count).filter((t) => count[t] >= 2);
  const edges = projects.flatMap((p) => p.stack.filter((t) => hubs.includes(t)).map((t) => ({ p: p.slug, h: t })));
  return { hubs, edges, count };
}

const TAU = Math.PI * 2;

// Positions in viewBox units. Featured projects sit across the top of the ring;
// each hub is placed in the angular order of the projects that use it, which
// keeps wires short and mostly uncrossed.
function layout(portrait, graph) {
  const W = portrait ? 600 : 1000;
  const H = portrait ? 700 : 600;
  const cx = W / 2, cy = H / 2;
  // labels sit above/below nodes (centred), so the ring can run wide without clipping
  const orx = W * (portrait ? 0.34 : 0.36), ory = H * (portrait ? 0.37 : 0.37);
  const irx = W * (portrait ? 0.17 : 0.25), iry = H * (portrait ? 0.2 : 0.22);
  const n = FEATURED_FIRST.length;
  const nodes = {};
  // featured at -90°, -90°±step; the rest continue round the ring
  const order = [1, 0, 2, 3, 4, 5, 6].map((i) => FEATURED_FIRST[i]);
  order.forEach((p, i) => {
    const a = -Math.PI / 2 + ((i - 1) * TAU) / n;
    nodes[p.slug] = { x: cx + orx * Math.cos(a), y: cy + ory * Math.sin(a), a };
  });
  const mean = (h) => {
    const ps = graph.edges.filter((e) => e.h === h).map((e) => nodes[e.p].a);
    return Math.atan2(ps.reduce((s, a) => s + Math.sin(a), 0), ps.reduce((s, a) => s + Math.cos(a), 0));
  };
  const sorted = [...graph.hubs].sort((a, b) => mean(a) - mean(b));
  const hubs = {};
  const start = mean(sorted[0]);
  sorted.forEach((h, i) => {
    const a = start + (i * TAU) / sorted.length;
    hubs[h] = { x: cx + irx * Math.cos(a), y: cy + iry * Math.sin(a) };
  });
  relax(hubs, nodes, portrait, W, H);
  return { W, H, cx, cy, nodes, hubs };
}

// Push hub pills off each other and off project labels/rings. A few passes of
// pairwise separation; deterministic, so the map never jitters between renders.
// ponytail: O(iter·n²) on 10 hubs × 7 nodes; fine until the graph is ~10x bigger.
function relax(hubs, nodes, portrait, W, H) {
  const fsH = portrait ? 17 : 15, fsP = portrait ? 27 : 24;
  const hubBox = (h, p) => ({ w: h.length * fsH * 0.68 + fsH * 1.6 + 8, h: fsH * 2.1 + 6, x: p.x, y: p.y });
  const nodeBoxes = Object.entries(nodes).flatMap(([slug, n]) => {
    const name = (projects.find((p) => p.slug === slug).short || projects.find((p) => p.slug === slug).name);
    const r = 26 * (portrait ? 1.25 : 1);
    const below = Math.sin(n.a) >= 0.1;
    const ly = below ? n.y + r + fsP * 0.45 : n.y - r - fsP * 0.55;
    return [
      { x: n.x, y: n.y, w: r * 2, h: r * 2 },
      { x: n.x, y: ly, w: name.length * fsP * 0.42 + 10, h: fsP * 1.1 },
    ];
  });
  const keys = Object.keys(hubs);
  const push = (a, b, move) => {
    const ox = (a.w + b.w) / 2 - Math.abs(a.x - b.x);
    const oy = (a.h + b.h) / 2 - Math.abs(a.y - b.y);
    if (ox <= 0 || oy <= 0) return;
    // separate along the axis of least overlap
    if (ox < oy) move(Math.sign(a.x - b.x || 1) * ox, 0); else move(0, Math.sign(a.y - b.y || 1) * oy);
  };
  for (let it = 0; it < 40; it++) {
    keys.forEach((k, i) => {
      const a = hubBox(k, hubs[k]);
      nodeBoxes.forEach((b) => push(a, b, (dx, dy) => { hubs[k].x += dx; hubs[k].y += dy; a.x += dx; a.y += dy; }));
      keys.slice(i + 1).forEach((k2) => {
        const b = hubBox(k2, hubs[k2]);
        push(a, b, (dx, dy) => { hubs[k].x += dx / 2; hubs[k].y += dy / 2; hubs[k2].x -= dx / 2; hubs[k2].y -= dy / 2; });
      });
      // stay inside the frame
      hubs[k].x = Math.min(W - a.w / 2 - 4, Math.max(a.w / 2 + 4, hubs[k].x));
      hubs[k].y = Math.min(H - a.h / 2 - 4, Math.max(a.h / 2 + 4, hubs[k].y));
    });
  }
}

const easeOut = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function frameFor(slug, L, graph) {
  if (!slug) return [0, 0, L.W, L.H];
  const portrait = L.W < L.H;
  const fsH = portrait ? 17 : 15, fsP = portrait ? 27 : 24;
  // boxes, not points: a pill or label half-outside the frame reads as breakage
  const n = L.nodes[slug];
  const p = projects.find((q) => q.slug === slug);
  const r = 26 * (portrait ? 1.25 : 1);
  const lw = (p.short || p.name).length * fsP * 0.42 + 10;
  const ly = Math.sin(n.a) >= 0.1 ? n.y + r + fsP * 0.45 : n.y - r - fsP * 0.55;
  const boxes = [
    { x: n.x, y: n.y, w: r * 2, h: r * 2 },
    { x: n.x, y: ly, w: lw, h: fsP * 1.2 },
    ...graph.edges.filter((e) => e.p === slug).map((e) => ({ ...L.hubs[e.h], w: e.h.length * fsH * 0.68 + fsH * 1.6, h: fsH * 2.1 })),
  ];
  const pad = L.W * 0.04;
  let x0 = Math.min(...boxes.map((b) => b.x - b.w / 2)) - pad;
  let x1 = Math.max(...boxes.map((b) => b.x + b.w / 2)) + pad;
  let y0 = Math.min(...boxes.map((b) => b.y - b.h / 2)) - pad - L.H * 0.08; // headroom for the WHOLE MAP button
  let y1 = Math.max(...boxes.map((b) => b.y + b.h / 2)) + pad;
  // keep the container's aspect so nothing distorts; never zoom past 2x
  const aspect = L.W / L.H;
  let w = Math.max(x1 - x0, L.W / 2), h = Math.max(y1 - y0, L.H / 2);
  if (w / h > aspect) h = w / aspect; else w = h * aspect;
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
  return [mx - w / 2, my - h / 2, w, h];
}

export default function SystemMap({ selected, onSelect, hover, onHover }) {
  const wrap = useRef(null);
  const svg = useRef(null);
  const [portrait, setPortrait] = useState(false);
  const graph = useMemo(buildGraph, []);
  const L = useMemo(() => layout(portrait, graph), [portrait, graph]);
  const [vb, setVb] = useState(() => [0, 0, L.W, L.H]);
  const vbRef = useRef(vb);
  vbRef.current = vb;
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // While the camera moves, things slide under a resting pointer; those aren't real hovers.
  const tweening = useRef(false);
  const softHover = (v) => { if (!tweening.current) onHover(v); };
  // Keyboard focus on a node outside the dive frame pulls the camera back to the whole map.
  const [overview, setOverview] = useState(false);
  useEffect(() => setOverview(false), [selected]);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setPortrait(e.contentRect.width < 700));
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  // the camera: tween the viewBox to frame the selected project and its hubs
  useEffect(() => {
    const to = frameFor(overview ? null : selected, L, graph);
    // Every selection path (click, index, deep link, prev/next) lands here, so this is
    // the one place a stale hover gets cleared; otherwise it outranks the selection.
    if (!overview) onHover(null);
    if (reduce) { setVb(to); return; }
    tweening.current = true;
    const from = vbRef.current[2] > L.W * 1.01 || vbRef.current[3] > L.H * 1.01 ? [0, 0, L.W, L.H] : vbRef.current;
    let raf, t0;
    const step = (now) => {
      t0 ??= now;
      const k = easeOut(Math.min(1, (now - t0) / 700));
      setVb(from.map((v, i) => v + (to[i] - v) * k));
      if (k < 1) raf = requestAnimationFrame(step);
      else tweening.current = false;
    };
    raf = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(raf); tweening.current = false; };
  }, [selected, overview, L, graph, reduce]);

  // packets are a loop: pause them offscreen and in hidden tabs
  useEffect(() => {
    const el = svg.current;
    if (!el || reduce) return;
    let visible = true;
    const apply = () => (visible && !document.hidden ? el.unpauseAnimations() : el.pauseAnimations());
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; apply(); });
    io.observe(el);
    document.addEventListener('visibilitychange', apply);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', apply); };
  }, [reduce]);

  const focus = hover || (selected ? { type: 'p', id: selected } : null);
  const edgeLit = (e) => focus && ((focus.type === 'p' && e.p === focus.id) || (focus.type === 'h' && e.h === focus.id));
  const nodeLit = (slug) => focus && ((focus.type === 'p' && focus.id === slug) || (focus.type === 'h' && graph.edges.some((e) => e.p === slug && e.h === focus.id)));
  const hubLit = (h) => focus && ((focus.type === 'h' && focus.id === h) || (focus.type === 'p' && graph.edges.some((e) => e.h === h && e.p === focus.id)));
  const dimmed = (lit) => (focus && !lit ? 'opacity-30' : 'opacity-100');

  const fsP = portrait ? 27 : 24;
  const fsH = portrait ? 17 : 15;
  const path = (e) => {
    const a = L.hubs[e.h], b = L.nodes[e.p];
    const qx = (a.x + b.x) / 2 * 0.85 + L.cx * 0.15, qy = (a.y + b.y) / 2 * 0.85 + L.cy * 0.15;
    return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${qx.toFixed(1)} ${qy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  };
  const eid = (e) => `w-${e.p}-${e.h.replace(/[^a-z0-9]/gi, '')}${portrait ? '-p' : ''}`;

  return (
    <div ref={wrap} className="relative">
      <svg
        ref={svg}
        viewBox={vb.map((v) => v.toFixed(2)).join(' ')}
        className="system-map block h-auto w-full"
        style={{ aspectRatio: `${L.W} / ${L.H}` }}
        role="group"
        aria-label={`Map of ${projects.length} projects wired to the ${graph.hubs.length} tools they share`}
        onMouseLeave={() => onHover(null)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOverview(false); }}
      >
        {/* wires */}
        <g fill="none">
          {graph.edges.map((e, i) => (
            <path
              key={eid(e)}
              id={eid(e)}
              d={path(e)}
              pathLength="1"
              className={`map-wire transition-[stroke,opacity] duration-300 ${edgeLit(e) ? 'stroke-lilac-soft' : 'stroke-line'} ${dimmed(edgeLit(e))}`}
              strokeWidth={edgeLit(e) ? 1.6 : 1}
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * 18}ms` }}
            />
          ))}
        </g>

        {/* packets of light travelling tool -> project */}
        {!reduce && (
          <g aria-hidden="true">
            {graph.edges.map((e, i) => (
              <circle key={`k-${eid(e)}`} r={portrait ? 3.4 : 2.4} className={`transition-opacity duration-300 ${dimmed(edgeLit(e))}`} fill={L.nodes[e.p] && projects.find((p) => p.slug === e.p).featured ? '#FF6B3D' : '#A3A5FF'}>
                <animateMotion dur={`${3.2 + (i % 5) * 0.55}s`} begin={`${(i * 0.37) % 3}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1">
                  <mpath href={`#${eid(e)}`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        )}

        {/* tool hubs */}
        {graph.hubs.map((h) => {
          const { x, y } = L.hubs[h];
          const w = h.length * fsH * 0.68 + fsH * 1.6;
          const ht = fsH * 2.1;
          return (
            <g
              key={h}
              className={`map-node cursor-default transition-opacity duration-300 ${dimmed(hubLit(h))}`}
              onMouseEnter={() => softHover({ type: 'h', id: h })}
              onMouseLeave={() => onHover(null)}
              onClick={() => onHover(hover?.type === 'h' && hover.id === h ? null : { type: 'h', id: h })}
              role="img"
              aria-label={`${h}: used in ${graph.edges.filter((e) => e.h === h).map((e) => projects.find((p) => p.slug === e.p).name).join(', ')}`}
            >
              <rect x={x - w / 2} y={y - ht / 2} width={w} height={ht} rx={ht / 2} className={hubLit(h) ? 'fill-night stroke-lilac' : 'fill-void stroke-line'} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <text x={x} y={y + fsH * 0.36} textAnchor="middle" className="fill-mist font-mono" style={{ fontSize: fsH }}>{h}</text>
            </g>
          );
        })}

        {/* project nodes */}
        {FEATURED_FIRST.map((p, ni) => {
          const { x, y, a } = L.nodes[p.slug];
          const c = Math.cos(a), s = Math.sin(a);
          // centred label, above nodes in the top half and below in the bottom half
          const r = (p.featured ? 26 : 20) * (portrait ? 1.25 : 1);
          const lx = x;
          const ly = s < 0.1 ? y - r - fsP * 0.15 : y + r + fsP * 0.8;
          const isSel = selected === p.slug;
          return (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              onClick={(ev) => { ev.preventDefault(); onSelect(p.slug); }}
              onMouseEnter={() => softHover({ type: 'p', id: p.slug })}
              onMouseLeave={() => onHover(null)}
              onFocus={() => { onHover({ type: 'p', id: p.slug }); if (selected && selected !== p.slug) setOverview(true); }}
              onBlur={() => onHover(null)}
              aria-current={isSel ? 'true' : undefined}
              aria-label={`${p.name}, ${p.tagline}`}
              style={{ animationDelay: `${300 + ni * 70}ms` }}
              className={`map-node map-settle group outline-none transition-opacity duration-300 ${dimmed(nodeLit(p.slug))}`}
            >
              {/* generous invisible hit area */}
              <circle cx={x} cy={y} r={portrait ? 34 : 26} fill="transparent" />
              {p.featured && <circle cx={x} cy={y} r={portrait ? 19 : 15} fill="none" stroke="#FF6B3D" strokeWidth="1" vectorEffect="non-scaling-stroke" />}
              {isSel && <circle key={`pulse-${selected}`} cx={x} cy={y} r={portrait ? 19 : 15} fill="none" stroke="#FF6B3D" strokeWidth="1" vectorEffect="non-scaling-stroke" className="map-ring-pulse" />}
              <circle cx={x} cy={y} r={portrait ? 8 : 6.5} className={isSel ? 'fill-ember' : 'fill-void stroke-mist group-hover:fill-lilac group-focus-visible:fill-lilac'} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <text x={lx} y={ly} textAnchor="middle" className={`font-display uppercase transition-opacity duration-300 ${isSel ? 'fill-ember' : 'fill-mist'} ${selected && !nodeLit(p.slug) && !hover ? 'opacity-0' : ''}`} style={{ fontSize: fsP, fontWeight: 600, letterSpacing: '0.01em' }}>
                {p.short || p.name}
              </text>
              {/* focus ring for keyboard users, drawn in the world's colour */}
              <circle cx={x} cy={y} r={portrait ? 28 : 22} fill="none" stroke="#FF6B3D" strokeWidth="2" vectorEffect="non-scaling-stroke" className="opacity-0 group-focus-visible:opacity-100" />
            </a>
          );
        })}
      </svg>
    </div>
  );
}
