import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { projects } from '@/data/profile';
import Diagram from '@/components/Diagram';
import SystemMap, { buildGraph } from '@/components/SystemMap';
import { Meta, column, Arrow, External } from '@/components/Page';
import { pulseField } from '@/components/Field';

const HUBS = buildGraph().hubs;
const bySlug = (s) => projects.find((p) => p.slug === s);

function Entry({ p, onHover, onStep }) {
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return (
    <article key={p.slug} id="entry" aria-labelledby="entry-name" className="entry-swap border-t border-line pt-12">
      <div className={`grid gap-12 ${p.featured ? 'xl:grid-cols-[minmax(0,1fr)_24rem]' : ''}`}>
        <div>
          <h2 id="entry-name" className="display text-[clamp(3rem,8vw,6rem)]">{p.name}</h2>
          <p className="label mt-3 text-mist">{p.tagline}</p>
          <p className="mt-2 font-mono text-sm text-mist-dim">{p.kind} · {p.year} · open source</p>
          <p className="mt-8 max-w-[62ch] text-lg leading-relaxed text-mist">{p.summary}</p>
          <ul className="mt-8 max-w-[62ch] space-y-3 text-mist">
            {p.highlights.map((h) => (
              <li key={h} className="grid grid-cols-[1rem_1fr] gap-3 leading-relaxed">
                <span className="mt-[0.7em] h-px w-3 bg-ember" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <h3 className="label mt-10 text-mist">Stack</h3>
          {/* shared tools light their hub on the map above */}
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((t) => {
              const hub = HUBS.includes(t);
              return (
                <li key={t}>
                  <span
                    onMouseEnter={hub ? () => onHover({ type: 'h', id: t }) : undefined}
                    onMouseLeave={hub ? () => onHover(null) : undefined}
                    className={`inline-block border px-3 py-1.5 font-mono text-xs ${hub ? 'border-lilac/70 text-mist hover:border-ember' : 'border-line text-mist-dim'}`}
                  >
                    {t}
                  </span>
                </li>
              );
            })}
          </ul>
          <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary mt-10">
            Read the code on GitHub <External />
          </a>
        </div>
        {p.featured && (
          <figure className="self-start border border-line bg-ink/80 p-5">
            <Diagram key={p.slug} slug={p.slug} reveal className="h-auto w-full" />
            <figcaption className="label mt-4">How it works</figcaption>
          </figure>
        )}
      </div>
      <nav aria-label="Other projects" className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-6">
        <button type="button" onClick={() => onStep(prev.slug)} className="label link-quiet inline-flex min-h-11 items-center gap-3">
          <Arrow className="h-3 w-3 rotate-180" /> {prev.name}
        </button>
        <button type="button" onClick={() => onStep(next.slug)} className="label link-quiet inline-flex min-h-11 items-center gap-3">
          {next.name} <Arrow className="h-3 w-3" />
        </button>
      </nav>
    </article>
  );
}

export default function ProjectsPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const fromHash = bySlug(hash.slice(1)) ? hash.slice(1) : null;
  const [selected, setSelected] = useState(fromHash);
  const [hover, setHover] = useState(null);
  const shown = bySlug(selected) || projects[0];

  useEffect(() => { if (fromHash && fromHash !== selected) setSelected(fromHash); }, [fromHash]); // eslint-disable-line react-hooks/exhaustive-deps

  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toEntry = (delay) => setTimeout(() => document.getElementById('entry')?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' }), reduce ? 0 : delay);

  // scroll: 'after' = watch the camera dive first (700ms), then bring the entry in; 'now' = straight there
  const select = (slug, { scroll = 'after' } = {}) => {
    setHover(null); // a stale hover must never outrank the selection
    setSelected(slug);
    navigate({ hash: slug ? `#${slug}` : '' }, { replace: true });
    pulseField();
    if (slug && scroll === 'after') toEntry(850);
    if (slug && scroll === 'now') toEntry(0);
  };

  // deep links (#autosre from the home cards): dive, then open the entry
  useEffect(() => { if (fromHash) { const t = toEntry(1100); return () => clearTimeout(t); } }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Meta title="Projects" description="Open-source DevOps, SRE and cloud projects by Mittal Domadiya, mapped to the tools they share: Helmsman, AutoSRE, CloudScope, KubeChat and more." />

      <header className={`${column} pt-24 sm:pt-32 lg:pt-36`}>
        <h1 className="display text-[clamp(3.5rem,11vw,8.5rem)]">Projects</h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-mist sm:text-xl">
          Seven open-source projects, wired to the tools they actually use. Point at or tap a tool to see where I've used it; pick a project to open it.
        </p>
      </header>

      <section aria-label="Project map" className={`${column} mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_14rem]`}>
        <div>
        <div className="relative border border-line bg-void/40">
          <SystemMap selected={selected} onSelect={(s) => select(s)} hover={hover} onHover={setHover} />
          {selected && (
            <button type="button" onClick={() => select(null, { scroll: false })} className="label absolute right-3 top-3 min-h-11 bg-void/85 px-3 text-mist hover:text-ember">
              Whole map
            </button>
          )}
        </div>
        <p className="label mt-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full border border-ember" aria-hidden="true" /> Ringed: AI + infrastructure projects
        </p>
        </div>

        <nav aria-label="Projects index" className="self-start bg-void/85 p-3">
          <ol className="grid gap-1 sm:grid-cols-2 xl:grid-cols-1">
            {projects.map((p) => (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => select(p.slug)}
                  onMouseEnter={() => setHover({ type: 'p', id: p.slug })}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover({ type: 'p', id: p.slug })}
                  onBlur={() => setHover(null)}
                  aria-pressed={shown.slug === p.slug}
                  className={`group flex min-h-11 w-full items-baseline justify-between gap-3 border-l py-2 pl-4 text-left transition-colors duration-200 ${shown.slug === p.slug ? 'border-ember text-mist' : 'border-line text-mist-dim hover:border-lilac hover:text-mist'}`}
                >
                  <span>
                    <span className="block">{p.name}</span>
                    <span className="block text-sm text-mist-dim">{p.tagline}</span>
                  </span>
                  <span className="font-mono text-xs">{p.year}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      <div className={`${column} mt-16 pb-32`}>
        <Entry key={shown.slug} p={shown} onHover={setHover} onStep={(s) => select(s, { scroll: 'now' })} />
      </div>
    </>
  );
}
