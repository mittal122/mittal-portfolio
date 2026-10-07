import { Link } from 'react-router-dom';
import { person, education, communities } from '@/data/profile';
import { Meta, PageHeader, column, Arrow } from '@/components/Page';

export default function AboutPage() {
  return (
    <>
      <Meta title="About" description="About Mittal Domadiya: final-year BTech CSE student at Charotar University of Science and Technology, focused on DevOps, SRE and cloud." />
      <PageHeader title="About">{person.summary}</PageHeader>

      <div className={`${column} space-y-24 pb-32`}>
        <section aria-labelledby="edu">
          <h2 id="edu" className="display text-[clamp(2.25rem,5vw,3.75rem)]">Education</h2>
          <ol className="mt-8 border-l border-line">
            {education.map((e) => (
              <li key={e.degree} className="relative pb-10 pl-8 last:pb-0">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-lilac bg-void" aria-hidden="true" />
                <p className="font-mono text-sm text-mist-dim">{e.period}</p>
                <p className="mt-1 text-xl text-mist">{e.degree}</p>
                <p className="text-mist-dim">{e.institution}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="campus">
          <h2 id="campus" className="display text-[clamp(2.25rem,5vw,3.75rem)]">On campus</h2>
          <ul className="mt-8 max-w-4xl divide-y divide-line border-y border-line">
            {communities.map((c) => (
              <li key={c.name} className="py-6">
                <p className="text-xl text-mist">{c.name} <span className="text-mist-dim">· {c.role}</span></p>
                <p className="mt-1 text-mist-dim">{c.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="next">
          <h2 id="next" className="display text-[clamp(2.25rem,5vw,3.75rem)]">What I'm looking for</h2>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-mist">
            {person.availability}. The work I enjoy most is the kind in my projects: automating Kubernetes operations, making systems observable, and using AI where it helps a person decide rather than where it acts unchecked.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/projects" className="btn-primary">See the projects <Arrow /></Link>
            <Link to="/contact" className="btn-secondary">Write to me <Arrow /></Link>
          </div>
        </section>
      </div>
    </>
  );
}
