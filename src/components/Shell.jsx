import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { person } from '@/data/profile';
import { pulseField } from '@/components/Field';

export const ROUTES = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/certifications', label: 'Courses' },
  { to: '/contact', label: 'Contact' },
];

function Dots() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      {[[3, 3], [9, 3], [3, 9], [9, 9]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" fill="currentColor" />)}
    </svg>
  );
}

function MenuButton({ onClick, expanded }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      aria-haspopup="dialog"
      aria-expanded={expanded}
      className="grid h-11 w-11 place-items-center rounded-full border border-line text-mist transition-colors duration-200 hover:border-ember hover:text-ember"
    >
      <Dots />
    </button>
  );
}

// Native <dialog>.showModal(): focus trap, Escape and inert background for free.
function Menu({ open, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Site menu"
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-void/95 p-0 text-mist backdrop:bg-void/60"
    >
      <div className="flex h-full flex-col px-6 py-5 lg:px-10">
        <div className="flex items-center justify-between">
          <span className="label text-mist">{person.name}</span>
          <button type="button" onClick={onClose} className="label min-h-11 px-2 text-mist hover:text-ember" autoFocus>
            Close
          </button>
        </div>
        <nav aria-label="Menu" className="my-auto">
          <ul className="space-y-1">
            {ROUTES.map((r) => (
              <li key={r.to}>
                <NavLink
                  to={r.to}
                  end
                  onClick={onClose}
                  className={({ isActive }) =>
                    `display block py-1 text-[clamp(2.75rem,9vw,5.5rem)] transition-colors duration-200 hover:text-ember ${isActive ? 'text-ember' : ''}`
                  }
                >
                  {r.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <a className="label link-quiet" href={`mailto:${person.email}`}>{person.email}</a>
          <a className="label link-quiet" href={person.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="label link-quiet" href={person.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </dialog>
  );
}

function ScrollRail() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div className="fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 bg-void/85 px-3 py-4 xl:flex" aria-hidden="true">
      <span className="label">Scroll</span>
      <div className="relative h-40 w-px bg-line">
        <span className="absolute left-0 top-0 w-px bg-lilac" style={{ height: `${p * 100}%` }} />
        <span className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-mist bg-void" style={{ top: `${p * 100}%` }} />
      </div>
      <span className="label tabular-nums">{String(Math.round(p * 100)).padStart(2, '0')}%</span>
    </div>
  );
}

export default function Shell({ children }) {
  const [menu, setMenu] = useState(false);
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  // New route: back to top (unless it targets an anchor) and a flash through the field.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (!hash) window.scrollTo(0, 0);
    pulseField();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <a href="#main" className="label fixed left-4 top-4 z-50 -translate-y-24 bg-ember px-4 py-3 text-void focus:translate-y-0">
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-30 border-b border-line/70 bg-void/85">
        <div className="flex h-16 items-center gap-6 px-5 lg:px-10">
          <Link to="/" className="label whitespace-nowrap text-[0.75rem] text-mist hover:text-ember">
            {person.name}
          </Link>
          <span className="label hidden whitespace-nowrap md:inline">DevOps &amp; SRE · CSE ’27</span>
          {/* the crosshair rule */}
          <div className="relative mx-4 hidden h-px flex-1 bg-line lg:block" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-y-1/2 bg-mist-dim" />
          </div>
          <div className="ml-auto flex items-center gap-6 lg:ml-0">
            <a className="label link-quiet hidden sm:inline" href={person.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="label link-quiet hidden sm:inline" href={`mailto:${person.email}`}>Email</a>
            <MenuButton onClick={() => setMenu(true)} expanded={menu} />
          </div>
        </div>
      </header>

      {/* left route rail */}
      <nav aria-label="Primary" className="fixed left-10 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <ul className="space-y-7">
          {ROUTES.map((r) => (
            <li key={r.to}>
              <NavLink to={r.to} end className={({ isActive }) => `group label flex min-h-6 items-center gap-3 transition-colors duration-200 hover:text-ember ${isActive ? 'text-mist' : ''}`}>
                {({ isActive }) => (
                  <>
                    <span className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive ? 'bg-ember' : 'bg-line group-hover:bg-ember'}`} aria-hidden="true" />
                    {r.label}
                    {isActive && <span className="sr-only">(current page)</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <ScrollRail />

      {/* status readout: the availability, stated once and plainly */}
      <p className="fixed bottom-6 right-6 z-20 hidden max-w-[10.5rem] bg-void/85 px-3 py-3 text-right xl:block">
        <span className="label flex items-center justify-end gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true" />Status</span>
        <span className="label mt-2 block text-mist">Open to roles</span>
        <span className="label mt-1 block">Full-time · 2027</span>
      </p>

      <main id="main" tabIndex={-1} className="outline-none">
        <div key={pathname} className="route-enter">{children}</div>
      </main>

      <footer className="relative border-t border-line/70 bg-void/80 px-5 pb-28 pt-10 lg:px-40 lg:pb-10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="label text-mist">{person.name}</span>
          <a className="label link-quiet" href={`mailto:${person.email}`}>{person.email}</a>
          <a className="label link-quiet" href={person.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="label link-quiet" href={person.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="label lg:ml-auto">© 2026</span>
        </div>
      </footer>

      {/* thumb-zone nav on phones and tablets */}
      <nav aria-label="Quick" className="fixed inset-x-4 bottom-4 z-30 lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between rounded-full border border-line bg-void/90 py-1 pl-6 pr-1">
          {ROUTES.filter((r) => ['/projects', '/about', '/contact'].includes(r.to)).map((r) => (
            <NavLink key={r.to} to={r.to} className={({ isActive }) => `label flex min-h-11 items-center px-1 ${isActive ? 'text-ember' : 'text-mist'}`}>
              {r.label}
            </NavLink>
          ))}
          <MenuButton onClick={() => setMenu(true)} expanded={menu} />
        </div>
      </nav>

      <Menu open={menu} onClose={() => setMenu(false)} />
    </>
  );
}
