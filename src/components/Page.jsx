import { Helmet } from 'react-helmet-async';
import { person } from '@/data/profile';

// Content column clears the fixed left rail (lg) and right rail (xl).
export const column = 'px-5 sm:px-8 lg:pl-48 lg:pr-12 xl:pr-52';

export function Meta({ title, description }) {
  return (
    <Helmet>
      <title>{title ? `${title} - ${person.name}` : `${person.name} - DevOps & SRE engineer in training`}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}

export function PageHeader({ title, children }) {
  return (
    <header className={`${column} pb-16 pt-32 lg:pb-24 lg:pt-40`}>
      <h1 className="display text-[clamp(3.5rem,11vw,8.5rem)]">{title}</h1>
      {children && <div className="mt-8 max-w-[62ch] text-lg leading-relaxed text-mist sm:text-xl">{children}</div>}
    </header>
  );
}

export function Arrow({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function External({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
