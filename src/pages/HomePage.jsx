import { Link } from 'react-router-dom';
import { person, projects, education, communities } from '@/data/profile';
import Diagram from '@/components/Diagram';
import { Meta, column, Arrow, External } from '@/components/Page';

const featured = projects.filter((p) => p.featured);

function FeaturedCard({ p }) {
  return (
    <article className="group relative flex flex-col border border-line bg-ink/70 transition-colors duration-300 hover:border-ember focus-within:border-ember">
      <div className="flex items-start justify-between gap-4 px-5 pt-5">
        <div>
          <h3 className="label text-[0.8125rem] text-mist">{p.name}</h3>
          <p className="label mt-2">{p.tagline}</p>
        </div>
        <span className="font-mono text-xs text-mist-dim">{p.year}</span>
      </div>
      <Diagram slug={p.slug} className="mx-auto my-4 h-auto w-full max-w-[22rem] px-4" />
      <div className="mt-auto flex items-center justify-between border-t border-line px-5 py-3">
        {/* the card's whole surface is the link to the full write-up */}
        <Link to={`/projects#${p.slug}`} className="label text-mist after:absolute after:inset-0 group-hover:text-ember">
          Read the entry
        </Link>
        <Arrow className="h-4 w-4 text-mist-dim transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-ember" />
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <Meta description="Mittal Domadiya, final-year CSE student building AI-assisted Kubernetes and SRE tooling: Helmsman, AutoSRE, CloudScope. Open to full-time DevOps/SRE roles from 2027." />

      {/* first viewport: who, stage, thesis, actions, and the work starting at the fold */}
      <section className={`${column} flex min-h-[100dvh] flex-col pt-28 lg:pt-32`}>
        <h1 className="display text-[clamp(4.25rem,15vw,10.5rem)]">
          <span className="block">Mittal</span>
          <span className="block">Domadiya</span>
        </h1>
        <p className="label mt-8 text-mist [text-wrap:balance]">{person.roleLine}</p>
        <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-mist sm:text-xl">{person.thesis}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link to="/projects" className="btn-primary sm:min-w-[15rem]">See the projects <Arrow /></Link>
          <Link to="/contact" className="btn-secondary sm:min-w-[13rem]">Write to me <Arrow /></Link>
        </div>

        <div className="mt-16 border-t border-line pt-6 lg:mt-14">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 className="label text-mist">Selected projects</h2>
            <Link to="/projects" className="label link-quiet inline-flex min-h-11 items-center gap-2">All seven <Arrow className="h-3 w-3" /></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((p) => <FeaturedCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      {/* the thesis, stated with its evidence */}
      <section className={`${column} py-32 lg:py-48`}>
        <h2 className="display text-[clamp(3rem,8vw,6.5rem)]">
          <span className="block">The model advises.</span>
          <span className="block text-ember">The core acts.</span>
        </h2>
        <div className="mt-12 grid max-w-5xl gap-10 text-lg leading-relaxed text-mist md:grid-cols-2">
          <p>
            In <Link className="underline decoration-line hover:decoration-ember" to="/projects#helmsman">Helmsman</Link>, a deterministic, tested core is the only thing
            that touches the cluster. The LLM explains and suggests; it never writes the YAML that gets applied.
          </p>
          <p>
            In <Link className="underline decoration-line hover:decoration-ember" to="/projects#autosre">AutoSRE</Link>, a Go controller runs the remediation loop through
            GitOps with rollback, a Python LLM service handles root-cause diagnosis, and anything it can't fix goes to a human.
          </p>
        </div>
      </section>

      {/* credentials, compact */}
      <section className={`${column} pb-32 lg:pb-48`} aria-labelledby="creds">
        <h2 id="creds" className="display text-[clamp(2.5rem,6vw,4.5rem)]">Background</h2>
        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          <div>
            <h3 className="label text-mist">Education</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {education.map((e) => (
                <li key={e.degree} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <p className="text-lg text-mist">{e.degree}</p>
                    <p className="text-mist-dim">{e.institution}</p>
                  </div>
                  <span className="shrink-0 font-mono text-sm text-mist-dim">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="label text-mist">On campus</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {communities.map((c) => (
                <li key={c.name} className="py-5">
                  <p className="text-lg text-mist">{c.name} <span className="text-mist-dim">· {c.role}</span></p>
                  <p className="text-mist-dim">{c.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Link to="/about" className="label link-quiet mt-8 inline-flex min-h-11 items-center gap-2">More about me <Arrow className="h-3 w-3" /></Link>
      </section>

      {/* the close */}
      <section className={`${column} pb-32 lg:pb-40`}>
        <div className="border-t border-line pt-16">
          <h2 className="display text-[clamp(3.5rem,12vw,9rem)]">Write to me</h2>
          <p className="mt-6 max-w-[48ch] text-lg text-mist">{person.availability}. Interviews, questions about a repo, or a role on your team.</p>
          <a href={`mailto:${person.email}`} className="mt-8 inline-block break-all font-display text-[clamp(1.75rem,4.5vw,3.25rem)] text-ember underline decoration-ember/40 underline-offset-8 hover:decoration-ember">
            {person.email}
          </a>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">Use the form <Arrow /></Link>
            <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn <External /></a>
            <a href={person.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub <External /></a>
          </div>
        </div>
      </section>
    </>
  );
}
