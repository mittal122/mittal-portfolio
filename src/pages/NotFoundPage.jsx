import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Meta, column, Arrow } from '@/components/Page';

export default function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <>
      <Meta title="Not found" />
      <Helmet><meta name="robots" content="noindex" /></Helmet>
      <section className={`${column} flex min-h-[100dvh] flex-col justify-center pb-24 pt-32`}>
        <h1 className="display text-[clamp(3.5rem,11vw,8.5rem)]">Nothing here</h1>
        <p className="mt-4 font-mono text-sm text-mist-dim">404 · {pathname}</p>
        <p className="mt-6 max-w-[48ch] text-lg text-mist">The link may be old or mistyped. The projects are the best place to start.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/projects" className="btn-primary">See the projects <Arrow /></Link>
          <Link to="/" className="btn-secondary">Home <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
